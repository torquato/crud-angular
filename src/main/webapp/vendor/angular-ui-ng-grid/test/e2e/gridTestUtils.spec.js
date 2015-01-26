/* globals protractor, element, by, browser */
/**
 * @ngdoc overview
 * @name ui.grid.e2eTestLibrary
 * @description
 * End to end test functions.  Whenever these are updated, it may also be necessary
 * to update the associated tutorial.
 * 
 */

/**
 * @ngdoc service
 * @name ui.grid.e2eTestLibrary.api:gridTest
 * @description
 * End to end test functions.  Whenever these are updated, it may also be necessary
 * to update the associated tutorial.
 * 
 */
module.exports = {
    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectRowCount
     * @description Checks that a grid has the specified number of rows. Note
     * that this only returns the number of rendered rows, and the grid does
     * row virtualisation - that is that the browser can only see the rendered
     * rows, not all the rows in the dataset.  This method is useful when doing
     * functional tests with small numbers of data, but typically with numbers
     * greater than about 10 you'll find that some of the rows are not rendered
     * and therefore an error is given.
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} expectedNumRows the number of visible rows you expect the
     * grid to have
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectRowCount('myGrid', 2);
     * </pre>
     * 
     */
    expectRowCount: function( gridId, expectedNumRows ) {

      var rows = element( by.id( gridId ) ).all( by.repeater('(rowRenderIndex, row) in rowContainer.renderedRows track by $index') );
      expect(rows.count()).toEqual(expectedNumRows);
    },
    

    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectHeaderColumnCount
     * @description Checks that a grid header body render container (the default render container)
     * has the specified number of columns.  If you are using pinned columns then you may also want
     * to check expectHeaderLeftColumnCount
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} expectedNumCols the number of visible columns you expect the
     * body to have
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectHeaderColumnCount('myGrid', 2);
     * </pre>
     * 
     */
    expectHeaderColumnCount: function( gridId, expectedNumCols ) {
      var headerCols = element( by.id( gridId ) ).element( by.css('.ui-grid-render-container-body')).element( by.css('.ui-grid-header') ).all( by.repeater('col in colContainer.renderedColumns track by col.colDef.name') );
      expect(headerCols.count()).toEqual(expectedNumCols);
    },


    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectHeaderLeftColumnCount
     * @description Checks that a grid header left render container has the specified number of columns.
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} expectedNumCols the number of visible columns you expect the
     * left render container to have
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectHeaderLeftColumnCount('myGrid', 2);
     * </pre>
     * 
     */
    expectHeaderLeftColumnCount: function( gridId, expectedNumCols ) {
      var headerCols = element( by.id( gridId ) ).element( by.css('.ui-grid-render-container-left')).element( by.css('.ui-grid-header') ).all( by.repeater('col in colContainer.renderedColumns track by col.colDef.name') );
      expect(headerCols.count()).toEqual(expectedNumCols);
    },
    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectFooterColumnCount
     * @description Checks that a grid footer has the specified number of rows.
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} expectedNumCols the number of visible columns you expect the
     * grid to have
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectColumnCount('myGrid', 2);
     * </pre>
     * 
     */
    expectFooterColumnCount: function( gridId, expectedNumCols ) {
      var footerCols = element( by.id( gridId ) ).element( by.css('.ui-grid-footer') ).all( by.repeater('col in colContainer.renderedColumns track by col.colDef.name') );
      expect(footerCols.count()).toEqual(expectedNumCols);
    },
    

    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name headerCell
     * @description Internal method used to return a headerCell element
     * given the grid and column
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} col the number of the column (within the visible columns)
     * that you want to return
     * 
     * @example 
     * <pre>
     *   gridTestUtils.headerCell('myGrid', 2);
     * </pre>
     * 
     */
    headerCell: function( gridId, expectedCol, expectedValue ) {
      return element( by.id( gridId ) ).element( by.css('.ui-grid-render-container-body')).element( by.css('.ui-grid-header') ).element( by.repeater('col in colContainer.renderedColumns track by col.colDef.name').row( expectedCol)  );
    },


    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name footerCell
     * @description Internal method used to return a footerCell element
     * given the grid and column
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} col the number of the column (within the visible columns)
     * that you want to return
     * 
     * @example 
     * <pre>
     *   gridTestUtils.headerCell('myGrid', 2);
     * </pre>
     * 
     */
    footerCell: function( gridId, expectedCol, expectedValue ) {
      return element( by.id( gridId ) ).element( by.css('.ui-grid-footer') ).element( by.repeater('col in colContainer.renderedColumns track by col.colDef.name').row( expectedCol)  );
    },


    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name dataCell
     * @description Internal method used to return a dataCell element
     * given the grid and column, note it only returns from the 'body'
     * render container
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} fetchRow the number of the row (within the visible rows)
     * that you want to return
     * @param {integer} fetchCol the number of the col (within the visible cols)
     * that you want to return
     * 
     * @example 
     * <pre>
     *   myElement = gridTestUtils.dataCell('myGrid', 2, 2);
     * </pre>
     * 
     */
    dataCell: function( gridId, fetchRow, fetchCol ) {
      var row = element( by.id( gridId ) ).element( by.css('.ui-grid-render-container-body')).element( by.repeater('(rowRenderIndex, row) in rowContainer.renderedRows track by $index').row( fetchRow )  );
      return row.element( by.repeater('(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name').row( fetchCol ));
    },


    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectHeaderCellValueMatch
     * @description Checks that a header cell matches the specified value,
     * takes a regEx or a simple string.  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} expectedCol the number of the column (within the visible columns)
     * that you want to check the value of
     * @param {string} expectedValue a regex or string of the value you expect in that header
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectHeaderCellValueMatch('myGrid', 2, 'HeaderValue');
     * </pre>
     * 
     */
    expectHeaderCellValueMatch: function( gridId, expectedCol, expectedValue ) {
      var headerCell = this.headerCell( gridId, expectedCol);
      expect(headerCell.getText()).toMatch(expectedValue);
    },


    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectFooterCellValueMatch
     * @description Checks that a footer cell matches the specified value,
     * takes a regEx or a simple string.  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} expectedCol the number of the column (within the visible columns)
     * that you want to check the value of
     * @param {string} expectedValue a regex or string of the value you expect in that footer
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectFooterCellValueMatch('myGrid', 2, 'FooterValue');
     * </pre>
     * 
     */
    expectFooterCellValueMatch: function( gridId, expectedCol, expectedValue ) {
      var footerCell = this.footerCell( gridId, expectedCol);
      expect(footerCell.getText()).toMatch(expectedValue);
    },
    

    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectCellValueMatch
     * @description Checks that a cell matches the specified value,
     * takes a regEx or a simple string.  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} expectedRow the number of the row (within the visible rows)
     * that you want to check the value of
     * @param {integer} expectedCol the number of the column (within the visible columns)
     * that you want to check the value of
     * @param {string} expectedValue a regex or string of the value you expect in that cell
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectCellValueMatch('myGrid', 0, 2, 'CellValue');
     * </pre>
     * 
     */
    expectCellValueMatch: function( gridId, expectedRow, expectedCol, expectedValue ) {
      var dataCell = this.dataCell( gridId, expectedRow, expectedCol );
      expect(dataCell.getText()).toMatch(expectedValue);
    },
    

    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectRowValuesMatch
     * @description Checks that a row matches the specified values,
     * takes an array of regExes or simple strings.  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} expectedRow the number of the row (within the visible rows)
     * that you want to check the value of
     * @param {array} expectedValueArray an array of regexes or strings of the values you expect in that row
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectRowValuesMatch('myGrid', 0, [ 'CellValue1', '^cellvalue2', 'cellValue3$' ]);
     * </pre>
     * 
     */
    expectRowValuesMatch: function( gridId, expectedRow, expectedValueArray ) {
      var row = element( by.id( gridId ) ).element( by.repeater('(rowRenderIndex, row) in rowContainer.renderedRows track by $index').row( expectedRow )  );

      for ( var i = 0; i < expectedValueArray.length; i++){
        expect(row.element( by.repeater('(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name').row(i)).getText()).toMatch(expectedValueArray[i], 'Expected to match: ' + expectedValueArray[i] + ' in column: ' + i);
      }
    },


    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name clickHeaderCell
     * @description Clicks on the header of the specified column,
     * which would usually result in a sort 
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to click on
     * 
     * @example 
     * <pre>
     *   gridTestUtils.clickHeaderCell('myGrid', 0);
     * </pre>
     * 
     */
    clickHeaderCell: function( gridId, colNumber ) {
      var headerCell = this.headerCell( gridId, colNumber);
      
      headerCell.click();
    },

  /**
   * @ngdoc method
   * @methodOf ui.grid.e2eTestLibrary.api:gridTest
   * @name resizeHeaderCell
   * @description Drags the left resizer border towards the column menu button,
   * which will perform a column resizing.
   * @param {string} gridId the id of the grid that you want to adjust
   * @param {integer} colNumber the number of the column (within the visible columns)
   * which left resizer border you wish to drag (this will increase the size of colNumber-1).
   *
   * @example
   * <pre>
   *   gridTestUtils.resizeHeaderCell('myGrid', 1);
   * </pre>
   *
   */
    resizeHeaderCell: function( gridId, colNumber ) {
      var headerCell = this.headerCell(gridId, colNumber);

      var resizer = headerCell.all( by.css( '.ui-grid-column-resizer' )).first();
      var menuButton = headerCell.element( by.css( '.ui-grid-column-menu-button' ));

      browser.actions()
        .mouseDown(resizer)
        .mouseMove(menuButton)
        .mouseUp()
        .perform();

    },



    /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name shiftClickHeaderCell
     * @description Shift-clicks on the header of the specified column,
     * which would usually result in adding a second column to the sort 
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to click on
     * 
     * @example 
     * <pre>
     *   gridTestUtils.shiftClickHeaderCell('myGrid', 0);
     * </pre>
     * 
     */
    shiftClickHeaderCell: function( gridId, colNumber ) {
      var headerCell = this.headerCell( gridId, colNumber);

      browser.actions()
        .keyDown(protractor.Key.SHIFT)
        .click(headerCell)
        .keyUp(protractor.Key.SHIFT)
        .perform();
    },
 
     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name clickColumnMenu
     * @description Clicks on the specified option in the specified column
     * menu.  Using this method is fragile, as any change to menu ordering
     * will break all the tests.  For this reason it is recommended to wrap
     * this into "clickColumnMenu<ItemName>" methods, each with a constant
     * for the item you want to click on.  You could alternatively develop
     * a method that finds a menu item by text value, but given that
     * ui-grid has i18n, the text values could also change easily
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to sort on
     * @param {integer} menuItemNumber the number of the item in the menu that
     * you want to click on
     * 
     * @example 
     * <pre>
     *   gridTestUtils.clickColumnMenu('myGrid', 0, 0);
     * </pre>
     * 
     */
    clickColumnMenu: function( gridId, colNumber, menuItemNumber ) {
      var headerCell = this.headerCell( gridId, colNumber);
      
      headerCell.element( by.css( '.ui-grid-column-menu-button' ) ).click();
      
      var columnMenu = element( by.id( gridId ) ).element( by.css( '.ui-grid-column-menu' ));
      columnMenu.element( by.repeater('item in menuItems').row(menuItemNumber) ).click();
    },
    
    
     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name clickColumnMenuSortAsc
     * @description Clicks on the sort ascending item within the specified
     * column menu.  Although it feels cumbersome to write lots of individual
     * "click this menu item" helpers, it is quite useful if the column menus are
     * changed to not have to go to every test script and change the menu item number  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to sort on
     * 
     * @example 
     * <pre>
     *   gridTestUtils.clickColumnMenuSortAsc('myGrid', 0);
     * </pre>
     * 
     */
    clickColumnMenuSortAsc: function( gridId, colNumber ) {
      this.clickColumnMenu( gridId, colNumber, 0);
    },


     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name clickColumnMenuSortDesc
     * @description Clicks on the sort descending item within the specified
     * column menu.  Although it feels cumbersome to write lots of individual
     * "click this menu item" helpers, it is quite useful if the column menus are
     * changed to not have to go to every test script and change the menu item number  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to sort on
     * 
     * @example 
     * <pre>
     *   gridTestUtils.clickColumnMenuSortDesc('myGrid', 0);
     * </pre>
     * 
     */
    clickColumnMenuSortDesc: function( gridId, colNumber ) {
      this.clickColumnMenu( gridId, colNumber, 1);
    },


     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name clickColumnMenuRemoveSort
     * @description Clicks on the remove sort item within the specified
     * column menu.  Although it feels cumbersome to write lots of individual
     * "click this menu item" helpers, it is quite useful if the column menus are
     * changed to not have to go to every test script and change the menu item number  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to remove the sort from
     * 
     * @example 
     * <pre>
     *   gridTestUtils.clickColumnMenuRemoveSort('myGrid', 0);
     * </pre>
     * 
     */
    clickColumnMenuRemoveSort: function( gridId, colNumber ) {
      this.clickColumnMenu( gridId, colNumber, 2);
    },
 
      /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name clickColumnMenuHide
     * @description Clicks on the hide item within the specified
     * column menu.  Although it feels cumbersome to write lots of individual
     * "click this menu item" helpers, it is quite useful if the column menus are
     * changed to not have to go to every test script and change the menu item number  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to hide
     * 
     * @example 
     * <pre>
     *   gridTestUtils.clickColumnMenuHide('myGrid', 0);
     * </pre>
     * 
     */
    clickColumnMenuHide: function( gridId, colNumber ) {
      this.clickColumnMenu( gridId, colNumber, 3);
    },   
     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectFilterBoxInColumn
     * @description Checks that a filter box exists in the specified column  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to verify the filter box is in
     * @param {integer} count the number filter boxes you expect - 0 meaning none, 1 meaning
     * a standard filter, 2 meaning a numerical filter with greater than / less than.
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectFilterBoxInColumn('myGrid', 0, 0);
     * </pre>
     * 
     */
    expectFilterBoxInColumn: function( gridId, colNumber, count ) {
      var headerCell = this.headerCell( gridId, colNumber);
      
      expect( headerCell.all( by.css( '.ui-grid-filter-input' ) ).count() ).toEqual(count);
    },


     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name cancelFilterInColumn
     * @description Cancels the filter in a column  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to cancel the filter in
     * 
     * @example 
     * <pre>
     *   gridTestUtils.cancelFilterInColumn('myGrid', 0);
     * </pre>
     * 
     */
    cancelFilterInColumn: function( gridId, colNumber ) {
      var headerCell = this.headerCell( gridId, colNumber);
      
      headerCell.element( by.css( '.ui-grid-icon-cancel' ) ).click();
    },
    

     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name enterFilterInColumn
     * @description Enters a filter in a column  
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to enter the filter in
     * @param {string} filterValue the value you want to enter into the filter
     * 
     * @example 
     * <pre>
     *   gridTestUtils.cancelFilterInColumn('myGrid', 0);
     * </pre>
     * 
     */
    enterFilterInColumn: function( gridId, colNumber, filterValue ) {
      var headerCell = this.headerCell( gridId, colNumber);
      
      headerCell.element( by.css( '.ui-grid-filter-input' ) ).sendKeys(filterValue);
    },
    

     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectVisibleColumnMenuItems
     * @description Checks how many visible menu items there are in the column menu   
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} colNumber the number of the column (within the visible columns)
     * that you want to check the count for
     * @param {integer} expectItems the number of visible items you expect
     * 
     * @example 
     * <pre>
     *   gridTestUtils.visibleColumnMenuItems('myGrid', 0, 3);
     * </pre>
     * 
     */
    expectVisibleColumnMenuItems: function( gridId, colNumber, expectItems ) {
      var headerCell = this.headerCell( gridId, colNumber );
      headerCell.element( by.css( '.ui-grid-column-menu-button' ) ).click();
      
      var displayedCount = 0;
      var columnMenu = element( by.id( gridId ) ).element( by.css( '.ui-grid-column-menu' ));
 
      var menuItems = columnMenu.all( by.css( '.ui-grid-menu-item' ) );
      
      menuItems.map(function(elm) {
        return elm.isDisplayed();
      }).then( function( displayedArray ){
        for ( var i = 0; i < displayedArray.length; i++ ){
          if ( displayedArray[i] ){
            displayedCount++;
          }
        }
        expect(displayedCount).toEqual( expectItems );
      }); 
    },
    

     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name expectVisibleGridMenuItems
     * @description Checks how many visible menu items there are in the grid menu   
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} expectItems the number of visible items you expect
     * 
     * @example 
     * <pre>
     *   gridTestUtils.expectVisibleGridMenuItems('myGrid', 3);
     * </pre>
     * 
     */
    expectVisibleGridMenuItems: function( gridId, expectItems ) {
      var gridMenuButton = element( by.id( gridId ) ).element( by.css ( '.ui-grid-menu-button' ) );
      gridMenuButton.click();
      
      var displayedCount = 0;
 
      var menuItems = gridMenuButton.all( by.css( '.ui-grid-menu-item' ) );
      
      menuItems.map(function(elm) {
        return elm.isDisplayed();
      }).then( function( displayedArray ){
        for ( var i = 0; i < displayedArray.length; i++ ){
          if ( displayedArray[i] ){
            displayedCount++;
          }
        }
        expect(displayedCount).toEqual( expectItems );
      }); 
    },

     /**
     * @ngdoc method
     * @methodOf ui.grid.e2eTestLibrary.api:gridTest
     * @name clickGridMenuItem
     * @description Clicks on a numbered grid menu item.  Note that it's clicking
     * the item based on the underlying repeater - and that some of the items will
     * not be visible.  So the item you want to click on may not be the same
     * as the item number when you look at the ui   
     * @param {string} gridId the id of the grid that you want to inspect
     * @param {integer} itemNumber the number of visible items you expect
     * 
     * @example 
     * <pre>
     *   gridTestUtils.clickVisibleGridMenuItem('myGrid', 9);
     * </pre>
     * 
     */
    clickGridMenuItem: function( gridId, itemNumber ) {
      var gridMenuButton = element( by.id( gridId ) ).element( by.css ( '.ui-grid-menu-button' ) );
      gridMenuButton.click();
      
      gridMenuButton.element( by.repeater('item in menuItems').row( itemNumber) ).click();
    }        
};

