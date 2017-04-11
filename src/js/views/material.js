/**
 * Material Design Light Theme ("material")
 *
 * Defines the Alpaca theme for Material Design Light.
 *
 * The views are:
 *
 *    material-view
 *    material-edit
 *    material-create
 *
 * This theme can also be selected by specifying the following view:
 *
 *    {
 *       "ui": "material",
 *       "type": "view" | "edit" | "create"
 *    }
 *
 */
(function ($) {

    var Alpaca = $.alpaca;

    // custom styles
    var styles = {};
    styles["button"] = "mdl-button mdl-js-button";
    // styles["smallButton"] = "btn btn-default btn-sm";
    // styles["addIcon"] = "glyphicon glyphicon-plus-sign";
    // styles["removeIcon"] = "glyphicon glyphicon-minus-sign";
    // styles["upIcon"] = "glyphicon glyphicon-chevron-up";
    // styles["downIcon"] = "glyphicon glyphicon-chevron-down";
    // styles["expandedIcon"] = "glyphicon glyphicon-circle-arrow-down";
    // styles["collapsedIcon"] = "glyphicon glyphicon-circle-arrow-right";
    styles["table"] = "mdl-data-table mdl-js-data-table";

    // custom callbacks
    var callbacks = {};
    // callbacks["required"] = function () {
    //     var fieldEl = this.getFieldEl();
    //
    //     // required fields get a little star in their label
    //     var label = $(fieldEl).find("label.alpaca-control-label");
    //     $('<span class="alpaca-icon-required"></span>').prependTo(label);
    //
    // };
    callbacks["invalid"] = function () {
        // if this is a control field, add class "has-error"
        if (this.isControlField) {
            $(this.getFieldEl()).append('<span class="mdl-textfield__error"></span>');
        }

        /*
         // if this is a container field, add class "has-error"
         if (this.isContainerField)
         {
         $(this.getFieldEl()).addClass('has-error');
         }
         */

    };
    callbacks["valid"] = function () {
        // valid fields remove the class 'has-error'
        $(this.getFieldEl()).removeClass('mdl-textfield__error');
    };
    callbacks["control"] = function () {
        // controls get some special formatting

        // fieldEl
        var fieldEl = this.getFieldEl();

        // controlEl
        var controlEl = this.getControlEl();

        $(fieldEl).addClass('mdl-textfield mdl-js-textfield mdl-textfield--floating-label');
        // all controls get the "form-control" class injected
        $(fieldEl).find("input").addClass("mdl-textfield__input");
        // $(fieldEl).find("textarea").addClass("form-control");
        // $(fieldEl).find("select").addClass("form-control");
        // except for the following
        $(fieldEl).find("input[type=checkbox]").removeClass("mdl-textfield__input");
        $(fieldEl).find("input[type=file]").removeClass("mdl-textfield__input");
        $(fieldEl).find("input[type=radio]").removeClass("mdl-textfield__input");

        // special case for type == color, remove form-control
        if (this.inputType === "color") {
            $(fieldEl).find("input").removeClass("mdl-textfield__input");
        }

        // any checkbox inputs get the "checkbox" class on their checkbox
        $(fieldEl).find("input[type=checkbox]").parent().parent().addClass("mdl-checkbox__input");
        // any radio inputs get the "radio" class on their radio
        $(fieldEl).find("input[type=radio]").parent().parent().addClass("mdl-radio mdl-js-radio");

        // if form has "form-inline" class, then radio and checkbox labels get inline classes
        // if ($(fieldEl).parents("form").hasClass("form-inline"))
        // {
        //     // checkboxes
        //     $(fieldEl).find("input[type=checkbox]").parent().addClass("checkbox-inline");
        //
        //     // radios
        //     $(fieldEl).find("input[type=radio]").parent().addClass("radio-inline");
        // }

        // all control labels get class "control-label"
        $(fieldEl).find("label.alpaca-control-label").addClass("mdl-textfield__label");

        // if in horizontal mode, add a wrapper div (col-sm-9) and label gets (col-sm-3)
        // if (this.view.horizontal)
        // {
        //     $(fieldEl).find("label.alpaca-control-label").addClass("col-sm-3");
        //
        //     var wrapper = $("<div></div>");
        //     wrapper.addClass("col-sm-9");
        //
        //     $(controlEl).after(wrapper);
        //     wrapper.append(controlEl);
        //
        //     $(fieldEl).append("<div style='clear:both;'></div>");
        // }
    };
    // callbacks["container"] = function()
    // {
    //     var containerEl = this.getContainerEl();
    //
    //     if (this.view.horizontal)
    //     {
    //         $(containerEl).addClass("form-horizontal");
    //     }
    // };
    // callbacks["form"] = function()
    // {
    //     var formEl = this.getFormEl();
    //
    //     // use pull-right for form buttons
    //     //$(formEl).find(".alpaca-form-buttons-container").addClass("pull-right");
    // };
    callbacks["enableButton"] = function (button) {
        $(button).removeAttr("disabled");
    };
    callbacks["disableButton"] = function (button) {
        $(button).attr("disabled", "disabled");
    };
    // callbacks["collapsible"] = function()
    // {
    //     var fieldEl = this.getFieldEl();
    //     var legendEl = $(fieldEl).find("legend").first();
    //     var anchorEl = $("[data-toggle='collapse']", legendEl);
    //     if ($(anchorEl).length > 0)
    //     {
    //         var containerEl = this.getContainerEl();
    //
    //         // container id
    //         var id = $(containerEl).attr("id");
    //         if (!id) {
    //             id = Alpaca.generateId();
    //             $(containerEl).attr("id", id);
    //         }
    //
    //         // set up container to be collapsible
    //         $(containerEl).addClass("collapse");
    //         if (!this.options.collapsed)
    //         {
    //             $(containerEl).addClass("in");
    //         }
    //
    //         // set up legend anchor
    //         if (!$(anchorEl).attr("data-target")) {
    //             $(anchorEl).attr("data-target", "#" + id);
    //         }
    //
    //         $(anchorEl).mouseover(function(e) {
    //             $(this).css("cursor", "pointer");
    //         })
    //     }
    // };

    // table-control callbacks
    // callbacks["tableHeaderRequired"] = function(schema, options, domEl)
    // {
    //     // required fields get a little star in their label
    //     $('<span class="alpaca-icon-required glyphicon glyphicon-star"></span>').prependTo(domEl);
    //
    // };
    // callbacks["tableHeaderOptional"] = function(schema, options, domEl)
    // {
    // };

    Alpaca.registerView({
        "id": "material-display",
        "parent": "web-display",
        "type": "display",
        "ui": "material",
        "title": "Display View for Material Design Light",
        "displayReadonly": true,
        "callbacks": callbacks,
        "styles": styles,
        "templates": {}
    });

    // Alpaca.registerView({
    //     "id": "bootstrap-display-horizontal",
    //     "parent": "bootstrap-display",
    //     "horizontal": true
    // });

    Alpaca.registerView({
        "id": "material-edit",
        "parent": "web-edit",
        "type": "edit",
        "ui": "material",
        "title": "Edit View for Material Design Light",
        "displayReadonly": true,
        "callbacks": callbacks,
        "styles": styles,
        "templates": {}
    });

    // Alpaca.registerView({
    //     "id": "bootstrap-edit-horizontal",
    //     "parent": "bootstrap-edit",
    //     "horizontal": true
    // });

    Alpaca.registerView({
        "id": "material-create",
        "parent": "material-edit",
        "title": "Create View for Material Design Light",
        "type": "create",
        "displayReadonly": false
    });

    // Alpaca.registerView({
    //     "id": "bootstrap-create-horizontal",
    //     "parent": "bootstrap-create",
    //     "horizontal": true
    // });

})(jQuery);
