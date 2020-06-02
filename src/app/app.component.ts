import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // To show data in normal DOM this will get append after DOM finished
  // title = 'Abhishek';
  // constructor(
  //   private viewContainerRef: ViewContainerRef,
  //   private cfr: ComponentFactoryResolver
  // ) { }

  // async load() {
  //   this.viewContainerRef.clear();
  //   const { LazyComponent } = await import('./lazy/lazy.component');
  //   let lazyComp = this.viewContainerRef.createComponent(
  //     this.cfr.resolveComponentFactory(LazyComponent)
  //   );
  //   lazyComp.instance.message = "Hello I am an Angular developer..!";
  //   // lazyComp.instance.sendEventMessage.subscribe((data: string ) => {
  //   //   console.log(data);
  //   //   this.title = data;
  //   // })
  // }

  // To show data in ng-template
  title = 'Lazy Component in Angular 9';

  @ViewChild('lazycomp', {read : ViewContainerRef}) 
  private newvcrf: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) { }

  // To show the component using async and await
  // async load() {
  //   this.newvcrf.clear();
  //   const { LazyComponent } = await import('./lazy/lazy.component');
  //   let lazyComp = this.newvcrf.createComponent(
  //     this.cfr.resolveComponentFactory(LazyComponent)
  //   );
  //   lazyComp.instance.message = "Hello I am an Angular developer..!";
  // }

  //To show the component using promise
  load() {
    this.newvcrf.clear();
    import('./lazy/lazy.component').then(
      ({LazyComponent}) => {
        let lazyComp = this.newvcrf.createComponent(
          this.cfr.resolveComponentFactory(LazyComponent)
        );
        lazyComp.instance.message = "Hello I am an Angular developer..!";
      }
    )
  }
}
