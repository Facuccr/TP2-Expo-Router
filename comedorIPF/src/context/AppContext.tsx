import React, { createContext, useContext, useState, useRef } from 'react';
import { AppContextType, Plato, CartItem, Pedido, UndoAction } from './types';
import { Cola } from '../estructuras/Cola';
import { Pila } from '../estructuras/Pila';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [nota, setNota] = useState('');
  const [nextOrderNumber, setNextOrderNumber] = useState(1);
  const [version, setVersion] = useState(0);

  // Mantenemos una única instancia lógica de la Cola y las Pilas usando useRef
  const ordersQueueRef = useRef(new Cola<Pedido>());
  const undoStackRef = useRef(new Pila<UndoAction>());
  const attendedStackRef = useRef(new Pila<Pedido>());

  // Forzamos el re-render de componentes que dependan de las mutaciones en Cola/Pila
  const forceUpdate = () => setVersion((v) => v + 1);

  const login = () => setSession(true);
  const logout = () => setSession(false);

  const agregarAlCarrito = (plato: Plato) => {
    // Generar ID único para que "deshacer" quite la última adición exacta (D4)
    const instanciaId = Math.random().toString(36).substring(2, 10);
    
    setCartItems((prev) => [...prev, { instanciaId, plato, cantidad: 1 }]);
    
    undoStackRef.current.push({ instanciaId, platoId: plato.id });
    forceUpdate();
  };

  const deshacerUltimo = () => {
    if (undoStackRef.current.vacia) return;
    
    const lastAction = undoStackRef.current.pop();
    if (lastAction) {
      setCartItems((prev) => prev.filter(item => item.instanciaId !== lastAction.instanciaId));
      forceUpdate();
    }
  };

  const vaciarCarrito = () => {
    setCartItems([]);
    setNota('');
    // Al confirmar, la pila de deshacer pierde sentido para el pedido actual
    undoStackRef.current = new Pila<UndoAction>();
    forceUpdate();
  };

  const confirmarPedido = () => {
    if (cartItems.length === 0) throw new Error("No hay items en el carrito");

    const nuevoPedido: Pedido = {
      numero: nextOrderNumber,
      items: [...cartItems],
      nota,
      creadoEn: new Date().toISOString(),
    };

    ordersQueueRef.current.encolar(nuevoPedido);
    setNextOrderNumber((prev) => prev + 1);
    
    vaciarCarrito();
    return nuevoPedido;
  };

  const atenderSiguiente = () => {
    if (ordersQueueRef.current.vacia) return;
    
    const pedidoAtendido = ordersQueueRef.current.desencolar();
    if (pedidoAtendido) {
      attendedStackRef.current.push(pedidoAtendido);
      forceUpdate();
    }
  };

  const cantidadCarrito = cartItems.length;
  const totalCarrito = cartItems.reduce((acc, item) => acc + (item.plato.precio * item.cantidad), 0);

  const value: AppContextType = {
    session,
    cartItems,
    nota,
    nextOrderNumber,
    version,
    ordersQueue: ordersQueueRef.current,
    undoStack: undoStackRef.current,
    attendedStack: attendedStackRef.current,
    login,
    logout,
    agregarAlCarrito,
    deshacerUltimo,
    setNota,
    vaciarCarrito,
    cantidadCarrito,
    totalCarrito,
    confirmarPedido,
    atenderSiguiente,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider');
  }
  return context;
}
