import { Component, OnInit } from '@angular/core';
import { Pilacoin } from '../../models/pilacoin';
import { PilacoinService } from '../../services/pilacoin-service.service';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})
export class CarteiraComponent implements OnInit {

  pilacoins?: any[];
  mineracaoButtonText: string = "Iniciar Mineração";
  minerando = false;

  constructor(
    private pilacoinService: PilacoinService
  ) { }

  ngOnInit(): void {
    this.getPilaCoins();
  }

  getPilaCoins(): void {
    this.pilacoinService.getAll().subscribe({
      next: (data) => {
        this.pilacoins = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  minerar(): void {
    this.minerando = !this.minerando;
    this.mineracaoButtonText = this.minerando ? 'Parar Mineração' : 'Iniciar Mineração';
    this.pilacoinService.minerar(this.minerando).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
