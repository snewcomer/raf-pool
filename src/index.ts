interface IPoolItem {
  [key: string]: Function;
}

/**
 * ensure use on requestAnimationFrame, no matter how many components
 * on the page are using this mixin
 *
 * @class RAFAdmin
 * @public
 */
export default class RAFAdmin {
  private pool: Array<IPoolItem>;

  constructor() {
    this.pool = [];
    this.flush();
  }

  /**
   * @method flush
   * @public
   */
  public flush(): void {
    window.requestAnimationFrame(() => {
      // assign to a variable to avoid ensure no race conditions happen
      // b/w flushing the pool and interating through the pool
      const { pool } = this;
      this.reset();
      pool.forEach((item: IPoolItem) => {
        item[Object.keys(item)[0]]();
      });

      this.flush();
    });
  }

  /**
   * @method add
   * @public
   */
  public add(elementId: string | number | symbol, fn: Function): Function {
    this.pool.push({ [elementId]: fn });
    return fn;
  }

  /**
   * @method remove
   * @public
   */
  public remove(elementId: string): void {
    this.pool = this.pool.filter((obj: IPoolItem) => {
      return !obj[elementId];
    });
  }

  /**
   * @method reset
   * @public
   */
  public reset(): void {
    this.pool = [];
  }
}
