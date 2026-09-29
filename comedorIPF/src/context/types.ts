export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}

export interface CartItem {
  instanciaId: string;
  plato: Plato;
  cantidad: number;
}

export interface UndoAction {
  instanciaId: string;
  platoId: number;
}

export interface Pedido {
  numero: number;
  items: CartItem[];
  nota: string;
  creadoEn: string;
}
