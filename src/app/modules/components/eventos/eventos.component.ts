import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { PilaDoColega } from '../../models/pilaDocolega';
import { PilacoinService } from '../../services/pilacoin-service.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  pilacoins?: PilaDoColega[];
  pilacoinCount = 0;
  paginationId = 'pilaCoinPagination';
  paginationConfig: PaginationInstance = {
    id: this.paginationId,
    itemsPerPage: 9,
    currentPage: 1
  };

  constructor(
    private pilacoinService: PilacoinService
  ) { }

  ngOnInit(): void {
    this.getPilaCoins();
    setInterval(() => {
      this.refreshPilaCoinsConstantly();
    }, 70000);
  }

  getPilaCoins(): void {
    this.pilacoinService.getAllColega().subscribe({
      next: (data) => {
        this.pilacoins = data;
        console.log(data);
        this.pilacoinCount = data.length;
      },
      error: (e) => console.error(e)
    });
  }

  refreshPilaCoinsConstantly() {
    this.pilacoins = null;
    this.getPilaCoins();
    console.log(this.pilacoins);
  }


}
