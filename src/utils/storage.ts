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
        setTimeout(() => {
          callback();
        }, 3000);        
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
  