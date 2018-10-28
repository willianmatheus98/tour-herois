import { Component, OnInit, Input } from '@angular/core';
import { Heroi } from '../heroi';

@Component({
  selector: 'app-heroi-detalhe',
  templateUrl: './heroi-detalhe.component.html',
  styleUrls: ['./heroi-detalhe.component.css']
})
export class HeroiDetalheComponent implements OnInit {

  constructor() { }
  @Input() heroi : Heroi;

  ngOnInit() {
  }

}
