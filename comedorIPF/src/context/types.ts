import { Cola } from '../estructuras/Cola';
import { Pila } from '../estructuras/Pila';

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

export interface AppContextType {
  // Estado
  session: boolean;
  cartItems: CartItem[];
  nota: string;
  nextOrderNumber: number;
  version: number;

  // Instancias de estructuras (solo lectura desde los componentes)
  ordersQueue: Cola<Pedido>;
  undoStack: Pila<UndoAction>;
  attendedStack: Pila<Pedido>;

  // Operaciones de sesión
  login: () => void;
  logout: () => void;

  // Operaciones de carrito
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  setNota: (nota: string) => void;
  vaciarCarrito: () => void;
  cantidadCarrito: number;
  totalCarrito: number;

  // Operaciones de pedido
  confirmarPedido: () => Pedido;

  // Operaciones de cocina
  atenderSiguiente: () => void;
}
