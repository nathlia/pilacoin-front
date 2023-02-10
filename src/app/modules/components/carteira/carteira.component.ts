import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import Swal from 'sweetalert2';
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
  pilacoinCount = 0;
  refreshCounter = false;

  paginationId = 'pilaCoinPagination';
  paginationConfig: PaginationInstance = {
    id: this.paginationId,
    itemsPerPage: 6,
    currentPage: 1
  };

  constructor(
    private pilacoinService: PilacoinService
  ) { }

  ngOnInit(): void {
    this.getPilaCoins();
    setInterval(() => {
      if (this.minerando) {
         this.refreshPilaCoins();
      }     
    }, 30000);
  }

  getPilaCoins(): void {
    this.pilacoinService.getAll().subscribe({
      next: (data) => {
        this.pilacoins = data;
        console.log(data);
        this.pilacoinCount = data.length;
        console.log(data.length);
      },
      error: (e) => console.error(e)
    });
  }

  refreshPilaCoins() {
    this.pilacoins = null;
    this.getPilaCoins();
    console.log(this.pilacoinCount);
    this.refreshCounter = true;
    setTimeout(() => this.refreshCounter = false, 1000);
    const Toast = Swal.mixin({
      width: '100px',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      color: 'var(--background)',
      background: 'var(--primary)',
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })          
    Toast.fire({
      icon: 'success',
      title: ''
    })
  }

  minerar(): void {
    this.minerando = !this.minerando;
    this.mineracaoButtonText = this.minerando ? 'Parar Mineração' : 'Iniciar Mineração';
    this.pilacoinService.minerar(this.minerando).subscribe({
      next: (data) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          color: 'var(--background)',
          background: 'var(--primary)',
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })          
        Toast.fire({
          icon: 'success',
          title: this.mineracaoButtonText === 'Parar Mineração' ? 'Iniciada!' : 'Parada!'
        })
      },
      error: (e) => console.error(e)
    });
  }





}

