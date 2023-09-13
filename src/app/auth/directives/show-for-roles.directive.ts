import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '../model';
import { Subscription, distinctUntilChanged, map, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { hasRole } from '../guards/has-role.guard';

@Directive({
  selector: '[akoShowForRoles]'
})
export class ShowForRolesDirective implements OnInit,OnDestroy{
  @Input('akoShowForRoles') allowedRoles?: Role[];
  private sub?:Subscription;

  constructor(
    private authService:AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

  ngOnInit(): void {
    this.sub = this.authService.user$.pipe(
      map((user) => Boolean(user && this.allowedRoles?.includes(user.role))),
      distinctUntilChanged(),
      tap((hasRole)=> hasRole ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear())
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
