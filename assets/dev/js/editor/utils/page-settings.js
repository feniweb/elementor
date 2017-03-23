var ViewModule = require( 'elementor-utils/view-module' ),
	Stylesheet = require( 'elementor-editor-utils/stylesheet' );

module.exports = ViewModule.extend( {
	stylesheet: new Stylesheet(),

	getDefaultElements: function() {
		return {
			$stylesheetElement: Backbone.$( '<style>' )
		};
	},

	bindEvents: function() {
		elementor.on( 'preview:loaded', this.updateStylesheet );
	},

	renderStyles: function() {
		var savedSettings = this.getSettings( 'savedSettings' );

		if ( ! savedSettings.show_title ) {
			this.stylesheet.addRules( '.elementor-page ' + elementor.config.page_title_selector, { 'display': 'none' } );
		}
	},

	updateStylesheet: function() {
		this.stylesheet.empty();

		this.renderStyles();

		this.addStyleToDocument();
	},

	addStyleToDocument: function() {
		elementor.$previewContents.find( 'head' ).append( this.elements.$stylesheetElement );

		this.elements.$stylesheetElement.text( this.stylesheet );
	},

	onInit: function() {
		this.setSettings( 'savedSettings', elementor.config.page_settings );

		ViewModule.prototype.onInit.apply( this, arguments );
	}
} );