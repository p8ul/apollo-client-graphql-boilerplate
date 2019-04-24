export default class Store {
    /**
     * @param {!string} name Database name
     * @param {function()} [callback] Called when the Store is ready
     */
    private getLocalStorage: ()=> any;
    private setLocalStorage: (data: any)=> void;
    constructor(name: string) {
      /**
       * @type {Storage}
       */
      /**
       * @type {ItemList}
       */
      let items = {};
      const { localStorage } = window;
      /**
       * Read the local Item from localStorage.
       *
       * @returns {Item} Current array/object of local item
       */
      this.getLocalStorage = () => {
        try {
          return JSON.parse(localStorage.getItem(name) || '{}');
        } catch (error) {
          console.warn(error)
          return {};
        }
      };
  
      /**
       * Write the local data to localStorage.
       *
       * @param {Item} data Array of item to write
       */
      this.setLocalStorage = (data: any) => {
        try {
          return localStorage.setItem(name, JSON.stringify(data || {}));
        } catch (error) {
          return {};
        }
      };
    }
  
    /**
     * Insert an item into the Store.
     *
     * @param {Item} item Item to insert
     * @param {function()} [callback] Called when item is inserted
     */
    insert(item: any, callback: ()=>any) {
      this.setLocalStorage(item);
  
      if (callback) {
        callback();
      }
    }

    /**
     * retrieve an item into the Store.
     *
     * @param {function()} [callback] Called when item is retrieved
     */
    retrieve() {
      return this.getLocalStorage() || {};
    }
  }
  