
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { DeleteModalComponent} from './delete-modal/delete-modal.component'

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              private applicationRef: ApplicationRef
              ) { }

  showAsComponent(id: string) {
    const deleteModal = document.createElement('delete-modal');
    
    const factory = this.componentFactoryResolver.resolveComponentFactory(DeleteModalComponent);

    const deleteModalRef = factory.create(this.injector,[], deleteModal);

    this.applicationRef.attachView(deleteModalRef.hostView);
    
    deleteModalRef.instance.closed.subscribe(()=> {
      document.body.removeChild(deleteModal);
      this.applicationRef.detachView(deleteModalRef.hostView);
    });
    deleteModalRef.instance.id = id;


    document.body.appendChild(deleteModal);
  }
}