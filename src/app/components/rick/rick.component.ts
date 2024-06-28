import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-rick',
  templateUrl: './rick.component.html',
  styleUrls: ['./rick.component.css']
})
export class RickComponent implements OnInit {
  listaPersonajes: any[] = [];
  nextPage: string | null = '';
  prevPage: string | null = '';
  nombreBusqueda: string = ''; // Para almacenar el término de búsqueda
  personajesOriginales: any[] = [];

  constructor(private rickService: RickAndMortyService) { }

  ngOnInit(): void {
    this.buscoPersonajes();
  }

  buscoPersonajes() {
    this.rickService.obtenerPersonajes(this.nombreBusqueda).subscribe((data) => {
      this.actualizaPropiedades(data);
    });
  }

  irA(url: string | null) {
    if (url) {
      this.rickService.irAPagina(url).subscribe(data => {
        this.actualizaPropiedades(data);
      });
    }
  }

  buscarPorNombre(event: Event) {
    const target = event.target as HTMLInputElement;
    this.nombreBusqueda = target.value;
    this.buscoPersonajes();
  }

  ordenarAlfabeticamente() {
    this.listaPersonajes.sort((a, b) => a.name.localeCompare(b.name));
  }

  actualizaPropiedades(data: any) {
    this.listaPersonajes = data.results;
    this.nextPage = data.info.next;
    this.prevPage = data.info.prev;
    this.personajesOriginales = data.results;
  }
}


