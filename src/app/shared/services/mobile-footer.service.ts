import { Injectable } from '@angular/core';
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MobileFooterService {
  private footerButtonsSubject: BehaviorSubject<FooterButton[]> = new BehaviorSubject<FooterButton[]>([]);
  footerButtons$: Observable<FooterButton[]> = this.footerButtonsSubject.asObservable();

  constructor() { }

  setFooterButtons(footerButtons: FooterButton[]) {
    this.footerButtonsSubject.next(footerButtons);
  }
}

export interface FooterButton {
  path: string,
  icon: IconDefinition,
  title: string
}
