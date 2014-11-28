/* 
 * Search Plugin : Make your table filterable
 * Search : Filter a table with a search field type
 * Description : You can filter on one or many columns by entering the key word in the search field 
 * Usage : 
 * <table id="my_table">
 *      <thead>
 *          <tr>
 *              <th>col1</th>
 *              <th>col2</th>
 *              <th>col3</th>
 *              ...
 *          </tr>
 *      </thead>
 *      <tbody>
 *      ...
 *      </tbody>
 * </table>
 * <script type="text/javascript">
 *  $(tableSelector).search(); //or $(tableSelector).search(options); if you have options to setup 
 * </script>
 */

$.fn.search = function(options){
	if(options!=undefined){
		this.opt = options;
	}else{
		this.opt = {};
	}
	var t = this;
    this.each(function(){
    	var tab = $(this);
        var tr = $(this).find('tbody tr');
        var thead = $(this).find('thead');
        var trh = $(this).find('thead tr');
        var th = $(this).find('thead tr th');
        var searchTr = $('<tr/>').attr('role', 'row');
        if(t.opt.trhId!=undefined){
        	searchTr.attr('id', t.opt.trhId);
        }
        if(t.opt.trhClass!=undefined){
        	searchTr.addClass(t.opt.trhClass);
        }
        th.each(function(){
        	if(t.opt.sfPosition!=undefined&&t.opt.sfPosition=='footer'){
        		var newth = $('<td/>');
        	}else{
        		var newth = $('<th/>');
        	}
            if(t.opt.thId!=undefined){
            	newth.attr('id', t.opt.thId);
            }
            if(t.opt.thClass!=undefined){
            	newth.addClass(t.opt.thClass);
            }
            var newSearch = $('<input/>')
            .attr('type','search');
            if(t.opt.sfSize!=undefined){
            	newSearch.attr('size', t.opt.sfSize);
            }else{
            	newSearch.attr('size', '15%');
            }
            if(t.opt.sfPlaceholder!=undefined){
            	newSearch.attr('placeholder', t.opt.sfPlaceholder+$(this).text())
            }else{
            	newSearch.attr('placeholder', 'Filter by '+$(this).text());
            }
            if(t.opt.sfClass!=undefined){
            	newSearch.addClass(t.opt.sfClass);
            }
            if(t.opt.sfId!=undefined){
            	newSearch.attr('id', t.opt.sfId);
            }
            newth.append(newSearch)
            searchTr.append(newth);
        });
        if(t.opt.sfPosition!=undefined){
        	if(t.opt.sfPosition=='beforeHeader'){
        		thead.prepend(searchTr);
        	}else if(t.opt.sfPosition=='afterHeader'){
        		thead.append(searchTr);
        	}
        }else{
        	thead.append(searchTr);
        }
        var src = $(this).find('input[type=search]');

        src.each(function(){
            var srcField = $(this); 
            srcField.on('keyup change', function(){
                tr.each(function(){
                    var match = true;
                    var tri = $(this);
                    src.each(function(){
                        var srcIndex = $(this).parent().index();
                        var v = $(this).val()
                                .replace(/\|/g, '\\|')
                                .replace(/\./g, '\\.')
                                .replace(/\$/g, '\\$')
                                .replace(/\?/g, '\\?')
                                .replace(/\(/g, '\\(')
                                .replace(/\)/g, '\\)');
                        var rgx = new RegExp(v, 'i'); 
                        var content = tri.find('td').eq(srcIndex).text();
                        match = match && rgx.test(content);
                    });
                    if(match){
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                });  
            });
        });   
    }); 
}
