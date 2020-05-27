import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: [ './loader.component.scss' ],
})
export class LoaderComponent implements OnInit, OnDestroy {
  isVisible = false;

  private sub$: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.sub$ = this.loaderService.loaderState.pipe(
      tap((state: boolean) => this.isVisible = state),
    )
    .subscribe();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

}
