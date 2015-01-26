describe('ui.grid.edit GridCellDirective - with dropdown', function () {
  var gridUtil;
  var scope;
  var element;
  var uiGridConstants;
  var recompile;
  var $timeout;

  beforeEach(module('ui.grid.edit'));

  beforeEach(inject(function ($rootScope, $compile, $controller, _gridUtil_, $templateCache, gridClassFactory,
                              uiGridEditService, _uiGridConstants_, _$timeout_) {
    gridUtil = _gridUtil_;
    uiGridConstants = _uiGridConstants_;
    $timeout = _$timeout_;

    $templateCache.put('ui-grid/uiGridCell', '<div class="ui-grid-cell-contents">{{COL_FIELD CUSTOM_FILTERS}}</div>');
    $templateCache.put('ui-grid/cellEditor', '<div><select ng-model="MODEL_COL_FIELD" ui-grid-edit-dropdown ng-options="field[editDropdownIdLabel] as field[editDropdownValueLabel] for field in editDropdownOptionsArray"></select></div>');

    scope = $rootScope.$new();
    var grid = gridClassFactory.createGrid();
    grid.options.columnDefs = [
      {name: 'col1', enableCellEdit: true, editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownOptionsArray: [{id: 1, value: 'fred'}, {id:2, value: 'john'}]}
    ];
    grid.options.data = [
      {col1: 1}
    ];
    uiGridEditService.initializeGrid(grid);
    grid.buildColumns();
    grid.modifyRows(grid.options.data);

    scope.grid = grid;
    scope.col = grid.columns[0];
    scope.row = grid.rows[0];

    scope.getCellValue = function(row,col){return 'val';};

    $timeout(function(){
      recompile = function () {
        $compile(element)(scope);
        $rootScope.$digest();
      };
    });
    $timeout.flush();

  }));

  describe('ui.grid.edit uiGridCell start editing', function () {
    var displayHtml;
    beforeEach(function () {
      element = angular.element('<div ui-grid-cell/>');
      recompile();

      displayHtml = element.html();
      expect(element.text()).toBe('1');
    });

    it('startEdit on "a"', function () {
      //stop edit
      var event = jQuery.Event("keydown");
      event.keyCode = 65;
      element.trigger(event);
      expect(element.find('input')).toBeDefined();
    });

    it('not start edit on tab', function () {
      //stop edit
      var event = jQuery.Event("keydown");
      event.keyCode = uiGridConstants.keymap.TAB;
      element.trigger(event);
      expect(element.html()).toEqual(displayHtml);
    });

  });

  describe('ui.grid.edit uiGridCell and uiGridEditor full workflow', function () {
    var displayHtml;
    beforeEach(function () {
      element = angular.element('<div ui-grid-cell/>');
      recompile();

      displayHtml = element.html();
      expect(element.text()).toBe('1');
      //invoke edit
      element.dblclick();
      expect(element.find('select')).toBeDefined();
      
      // val is the selected option, which is option 0
      expect(element.find('select').val()).toBe('0');
    });

    it('should stop editing on enter', function () {
      //stop edit
      var event = jQuery.Event("keydown");
      event.keyCode = uiGridConstants.keymap.ENTER;
      element.find('select').trigger(event);

      //back to beginning
      expect(element.html()).toBe(displayHtml);
    });

    it('should stop editing on esc', function () {
      //stop edit
      var event = jQuery.Event("keydown");
      event.keyCode = uiGridConstants.keymap.ESC;
      element.find('select').trigger(event);

      //back to beginning
      expect(element.html()).toBe(displayHtml);
    });

    it('should stop editing on arrow left', function () {
      //stop edit
      var event = jQuery.Event("keydown");
      event.keyCode = uiGridConstants.keymap.LEFT;
      element.find('select').trigger(event);

      //back to beginning
      expect(element.html()).toBe(displayHtml);
    });

    it('should stop editing on arrow right', function () {
      //stop edit
      var event = jQuery.Event("keydown");
      event.keyCode = uiGridConstants.keymap.RIGHT;
      element.find('select').trigger(event);

      //back to beginning
      expect(element.html()).toBe(displayHtml);
    });

    it('should stop editing on tab', function () {
      //stop edit
      var event = jQuery.Event("keydown");
      event.keyCode = uiGridConstants.keymap.TAB;
      element.find('select').trigger(event);

      //back to beginning
      expect(element.html()).toBe(displayHtml);
    });

    it('should stop when grid scrolls', function () {
      //stop edit
      scope.$broadcast(uiGridConstants.events.GRID_SCROLL);
      scope.$digest();
      //back to beginning
      expect(element.html()).toBe(displayHtml);
    });

    it('should fire public event', inject(function ($timeout) {

      var edited = false;

      scope.grid.api.edit.on.afterCellEdit(scope,function(rowEntity, colDef, newValue, oldValue){
        edited = true;
        scope.$apply();
      });

      //stop edit
      $timeout(function(){
        var event = jQuery.Event("keydown");
        event.keyCode = uiGridConstants.keymap.ENTER;
        element.find('select').trigger(event);
      });
      $timeout.flush();

      expect(edited).toBe(true);

    }));


  });

});
