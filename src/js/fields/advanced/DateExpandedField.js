(function ($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.DateExpandedField = Alpaca.ControlField.extend(
        /**
         * @lends Alpaca.Fields.TextField.prototype
         */
        {
            /**
             * @see Alpaca.ControlField#getFieldType
             */
            getFieldType: function () {
                return "dateexpanded";
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
                $(this.control).find("#" + this.id + "-month").off("change");
                $(this.control).find("#" + this.id + "-day").off("change");
                $(this.control).find("#" + this.id + "-year").off("change");
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
                $(this.control).find("#" + this.id + "-month").change(function () {
                    self._onChanged();
                });
                $(this.control).find("#" + this.id + "-day").change(function () {
                    self._onChanged();
                });
                $(this.control).find("#" + this.id + "-year").change(function () {
                    self._onChanged();
                });

                callback();
            },

            // /**
            //  * @see Alpaca.ControlField#postRender
            //  */
            // postRender: function (callback) {
            //
            //     var self = this;
            //
            //     this.base(function () {
            //
            //         if (self.control) {
            //             // autocomplete
            //             self.applyAutocomplete();
            //
            //             // mask
            //             self.applyMask();
            //
            //             // typeahead
            //             self.applyTypeAhead();
            //
            //             // update max length indicator
            //             self.updateMaxLengthIndicator();
            //         }
            //
            //         callback();
            //     });
            // },

            /**
             * @see Alpaca.Fields.ControlField#getControlValue
             */
            getControlValue: function () {
                var value = this._pullISODate();
                this.ensureProperType(value);

                return value;
            },

            /**
             * @see Alpaca.Field#setValue
             */
            setValue: function (value) {
                if (this.control && this.control.length > 0) {
                    if (Alpaca.isEmpty(value)) {
                        // TODO: JS Reset Month / Day / Year from empty value
                        this.control.val("");
                    }
                    else {
                        this._setISODate(value);
                    }
                }

                // be sure to call into base method
                this.base(value);
            },

            /**
             * @see Alpaca.ControlField#handleValidate
             */
            handleValidate: function () {
                var baseStatus = this.base();

                return baseStatus;
            },

            /**
             * @see Alpaca.Field#focus
             */
            focus: function (onFocusCallback) {
                if (this.control && this.control.length > 0) {
                    // focuses the control and also positions the input at the end

                    var el = $(this.control).get(0);

                    try {
                        var elemLen = el.value ? el.value.length : 0;
                        el.selectionStart = elemLen;
                        el.selectionEnd = elemLen;
                    }
                    catch (e) {
                        // field type doesn't support selection start and end
                    }

                    el.focus();

                    if (onFocusCallback) {
                        onFocusCallback(this);
                    }

                }
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
                return "Date field";
            },

            /**
             * @see Alpaca.Field#getDescription
             */
            getDescription: function () {
                return "Date field that uses individual Month / Day / Year fields";
            },

            /**
             * @Private
             */
            _onChanged: function () {
                var value = this.getControlValue();
                this.setValue(value);
            },

            /**
             * @Private
             */
            _pullISODate: function () {
                var result = null;
                var month = $(this.control).find("#" + this.id + "-month").val();
                var day = $(this.control).find("#" + this.id + "-day").val();
                var year = $(this.control).find("#" + this.id + "-year").val();
                if (month && day && year) {
                    const date = moment.utc([year, month, day]);
                    if (date.isValid()) {
                        result = date.toISOString();
                    }
                }
                return result;
            },

            /**
             * @Private
             */
            _setISODate: function (value) {
                var dateObj = this._parseISODate(value);
                $(this.control).find("#" + this.id + "-month").val(dateObj.month);
                $(this.control).find("#" + this.id + "-day").val(dateObj.day);
                $(this.control).find("#" + this.id + "-year").val(dateObj.year);
            },

            /**
             * @Private
             */
            _parseISODate: function (value) {
                var result = null;
                if (value) {
                    const momentDate = moment.utc(value);
                    if (momentDate && momentDate.isValid()) {
                        result = {
                            month: momentDate.month(),
                            day: momentDate.date(),
                            year: momentDate.year()
                        };
                    }
                }
                return result;
            },

            // /**
            //  * @private
            //  * @see Alpaca.ControlField#getSchemaOfSchema
            //  */
            // getSchemaOfSchema: function() {
            //     return Alpaca.merge(this.base(), {
            //         "properties": {
            //             "minLength": {
            //                 "title": "Minimal Length",
            //                 "description": "Minimal length of the property value.",
            //                 "type": "number"
            //             },
            //             "maxLength": {
            //                 "title": "Maximum Length",
            //                 "description": "Maximum length of the property value.",
            //                 "type": "number"
            //             },
            //             "pattern": {
            //                 "title": "Pattern",
            //                 "description": "Regular expression for the property value.",
            //                 "type": "string"
            //             }
            //         }
            //     });
            // },

            // /**
            //  * @private
            //  * @see Alpaca.ControlField#getOptionsForSchema
            //  */
            // getOptionsForSchema: function() {
            //     return Alpaca.merge(this.base(), {
            //         "fields": {
            //             "default": {
            //                 "helper": "Field default value",
            //                 "type": "text"
            //             },
            //             "minLength": {
            //                 "type": "integer"
            //             },
            //             "maxLength": {
            //                 "type": "integer"
            //             },
            //             "pattern": {
            //                 "type": "text"
            //             }
            //         }
            //     });
            // },

            // /**
            //  * @private
            //  * @see Alpaca.ControlField#getSchemaOfOptions
            //  */
            // getSchemaOfOptions: function() {
            //     return Alpaca.merge(this.base(), {
            //         "properties": {
            //             "size": {
            //                 "title": "Field Size",
            //                 "description": "Field size.",
            //                 "type": "number",
            //                 "default":40
            //             },
            //             "maskString": {
            //                 "title": "Mask Expression",
            //                 "description": "Expression for the field mask. Field masking will be enabled if not empty.",
            //                 "type": "string"
            //             },
            //             "placeholder": {
            //                 "title": "Field Placeholder",
            //                 "description": "Field placeholder.",
            //                 "type": "string"
            //             },
            //             "typeahead": {
            //                 "title": "Type Ahead",
            //                 "description": "Provides configuration for the $.typeahead plugin if it is available.  For full configuration options, see: https://github.com/twitter/typeahead.js"
            //             },
            //             "allowOptionalEmpty": {
            //                 "title": "Allow Optional Empty",
            //                 "description": "Allows this non-required field to validate when the value is empty"
            //             },
            //             "inputType": {
            //                 "title": "HTML5 Input Type",
            //                 "description": "Allows for the override of the underlying HTML5 input type.  If not specified, an assumed value is provided based on the kind of input control (i.e. 'text', 'date', 'email' and so forth)",
            //                 "type": "string"
            //             },
            //             "data": {
            //                 "title": "Data attributes for the underlying DOM input control",
            //                 "description": "Allows you to specify a key/value map of data attributes that will be added as DOM attribuets for the underlying input control.  The data attributes will be added as data-{name}='{value}'.",
            //                 "type": "object"
            //             },
            //             "autocomplete": {
            //                 "title": "HTML autocomplete attribute for the underlying DOM input control",
            //                 "description": "Allows you to specify the autocomplete attribute for the underlying input control whether or not field should have autocomplete enabled.",
            //                 "type": "string"
            //             },
            //             "disallowEmptySpaces": {
            //                 "title": "Disallow Empty Spaces",
            //                 "description": "Whether to disallow the entry of empty spaces in the text",
            //                 "type": "boolean",
            //                 "default": false
            //             },
            //             "disallowOnlyEmptySpaces": {
            //                 "title": "Disallow Only Empty Spaces",
            //                 "description": "Whether to disallow the entry of only empty spaces in the text",
            //                 "type": "boolean",
            //                 "default": false
            //             }
            //         }
            //     });
            // },

            // /**
            //  * @private
            //  * @see Alpaca.ControlField#getOptionsForOptions
            //  */
            // getOptionsForOptions: function() {
            //     return Alpaca.merge(this.base(), {
            //         "fields": {
            //             "size": {
            //                 "type": "integer"
            //             },
            //             "maskString": {
            //                 "helper": "a - an alpha character;9 - a numeric character;* - an alphanumeric character",
            //                 "type": "text"
            //             },
            //             "typeahead": {
            //                 "type": "object"
            //             },
            //             "allowOptionalEmpty": {
            //                 "type": "checkbox"
            //             },
            //             "inputType": {
            //                 "type": "text"
            //             },
            //             "data": {
            //                 "type": "object"
            //             }
            //         }
            //     });
            // }

            /* end_builder_helpers */

        });

    // Alpaca.registerMessages({
    //     "invalidPattern": "This field should have pattern {0}",
    //     "stringTooShort": "This field should contain at least {0} numbers or characters",
    //     "stringTooLong": "This field should contain at most {0} numbers or characters"
    // });
    Alpaca.registerFieldClass("dateexpanded", Alpaca.Fields.DateExpandedField);
    Alpaca.registerDefaultSchemaFieldMapping("string", "text");

})(jQuery);
