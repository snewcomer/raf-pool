/**
 * ensure use on requestAnimationFrame, no matter how many components
 * on the page are using this mixin
 *
 * @class RAFAdmin
 * @public
 */
export default class RAFAdmin {
  private pool: Array<object>;

  constructor(...args) {
    this.pool = [];
    this.flush();
  }

  /**
   * @method flush
   * @public
   */
  flush() {
    window.requestAnimationFrame(() => {
      // assign to a variable to avoid ensure no race conditions happen
      // b/w flushing the pool and interating through the pool
      let { pool } = this;
      this.reset();
      pool.forEach((item) => {
        item[Object.keys(item)[0]]();
      });

      this.flush();
    });
  }

  /**
   * @method add
   * @public
   */
  add(elementId, fn) {
    this.pool.push({ [elementId]: fn });
    return fn;
  }

  /**
   * @method remove
   * @public
   */
  remove(elementId) {
    this.pool = this.pool.filter(obj => !obj[elementId]);
  }

  /**
   * @method reset
   * @public
   */
  reset() {
    this.pool = [];
  }
}
