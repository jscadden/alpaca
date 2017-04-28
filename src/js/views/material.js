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
    // styles["table"] = "mdl-data-table mdl-js-data-table";

    // custom callbacks
    var callbacks = {};
    callbacks["required"] = function () {
        // var fieldEl = this.getFieldEl();
        //
        // // required fields get a little star in their label
        // var label = $(fieldEl).find("label.alpaca-control-label");
        // $('<span class="alpaca-icon-required"></span>').prependTo(label);
    };
    callbacks["invalid"] = function () {
        // if this is a control field, add class "has-error"
        if (this.isControlField) {
            var fieldEl = this.getFieldEl();
            var found = $(fieldEl).find("span.mdl-textfield__error");
            if (found.length === 0) {
                $(fieldEl).append('<span class="mdl-textfield__error"></span>');
                $(fieldEl).addClass('is-invalid');
            }
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
        var fieldEl = this.getFieldEl();
        var found = $(fieldEl).find("span.mdl-textfield__error");
        if (found.length > 0) {
            found.parent().removeClass('is-invalid');
            found.remove();
        }
    };

    callbacks["control"] = function () {
        // controls get some special formatting

        // fieldEl
        var fieldEl = this.getFieldEl();

        // controlEl
        var controlEl = this.getControlEl();

        // Text input
        $(fieldEl).find("input[type=text]").parent().addClass("mdl-textfield mdl-js-textfield mdl-textfield--floating-label");
        // Textarea input
        $(fieldEl).find("textarea").parent().addClass("mdl-textfield mdl-js-textfield mdl-textfield--floating-label");
    };

    callbacks["enableButton"] = function (button) {
        $(button).removeAttr("disabled");
    };

    callbacks["disableButton"] = function (button) {
        $(button).attr("disabled", "disabled");
    };

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

    Alpaca.registerView({
        "id": "material-create",
        "parent": "material-edit",
        "title": "Create View for Material Design Light",
        "type": "create",
        "displayReadonly": false
    });
})(jQuery);
