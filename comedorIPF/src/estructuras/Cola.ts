export class Cola<T> {
  #items: T[] = [];
  #frente = 0;

  encolar(item: T): void {
    this.#items.push(item);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const item = this.#items[this.#frente];
    this.#frente++;
    // Opcional: limpieza de memoria si la cola crece mucho (no requerido por spec, 
    // pero buena práctica, sin embargo la consigna pide estrictamente usar #frente y no usar shift)
    return item;
  }

  frente(): T | undefined {
    if (this.vacia) return undefined;
    return this.#items[this.#frente];
  }

  get vacia(): boolean {
    return this.#frente >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#frente;
  }

  aArray(): T[] {
    // Devuelve únicamente los elementos que siguen esperando (desde #frente en adelante)
    return this.#items.slice(this.#frente);
  }
}
