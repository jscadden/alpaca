(function ($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.TriStateField = Alpaca.ControlField.extend(
        /**
         * @lends Alpaca.Fields.TriStateField.prototype
         */
        {
            /**
             * @see Alpaca.ControlField#getFieldType
             */
            getFieldType: function () {
                return "tristate";
            },

            /**
             * @see Alpaca.Field#setup
             */
            setup: function () {
                this.base();
            },

            /**
             * @see Alpaca.Field#destroy
             */
            destroy: function () {
                this.base();
                $(this.field).find(".nz-toggle-value").off("click");
            },

            /**
             * Called after the control is rendered.
             *
             * @extension-point
             *
             * @param model
             * @param callback
             */
            afterRenderControl: function (model, callback) {
                var self = this;
                $(this.field).find(".nz-toggle-value").click(function (e) {
                    self._onClicked(e);
                });

                callback();
            },

            /**
             * @see Alpaca.Fields.ControlField#getControlValue
             */
            getControlValue: function () {
                var value = this._pullState();
                this.ensureProperType(value);

                return value;
            },

            /**
             * @see Alpaca.Field#setValue
             */
            setValue: function (value) {
                if (this.control && this.control.length > 0) {
                    this._setState(value);
                }

                // be sure to call into base method
                this.base(value);
            },

            /**
             * @see Alpaca.Field#getType
             */
            getType: function () {
                return "string";
            },

            /**
             * @see Alpaca.Field#getTitle
             */
            getTitle: function () {
                return "Tri State field";
            },

            /**
             * @see Alpaca.Field#getDescription
             */
            getDescription: function () {
                return "A field that represents 3 states (Example: Yes / No / Null)";
            },

            /**
             * @Private
             */
            _onClicked: function (event) {
                this._toggleState($(event.target));
                var value = this.getControlValue();
                this.setValue(value);
            },

            /**
             * @Private
             */
            _toggleState: function (target) {
                if (target.hasClass('null')) {
                    this._setState(null);
                }
                else if (target.hasClass('true')) {
                    this._setState("YES");
                }
                else if (target.hasClass('false')) {
                    this._setState("NO");
                }
            },

            /**
             * @Private
             */
            _pullState: function () {
                var el = $(this.field).find('.nz-toggle-wrap');
                var result = null;
                if (el.hasClass('null')) {
                    result = null;
                }
                else if (el.hasClass('true')) {
                    result = "YES";
                }
                else if (el.hasClass('false')) {
                    result = "NO";
                }
                return result;
            },

            /**
             * @Private
             */
            _setState: function (value) {
                var el = $(this.field).find('.nz-toggle-wrap');
                if (value == "YES") {
                    el.removeClass('null');
                    el.removeClass('false');
                    el.addClass('true');
                    el.find('.nz-toggle-handle__label').html("Yes");
                }
                else if (value == "NO") {
                    el.removeClass('null');
                    el.removeClass('true');
                    el.addClass('false');
                    el.find('.nz-toggle-handle__label').html("No");
                }
                else if (value == null) {
                    el.removeClass('true');
                    el.removeClass('false');
                    el.addClass('null');
                    el.find('.nz-toggle-handle__label').html("?");
                }
            }
        });

    Alpaca.registerFieldClass("tristate", Alpaca.Fields.TriStateField);
    Alpaca.registerDefaultSchemaFieldMapping("string", "text");

})(jQuery);
