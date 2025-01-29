
(($ => {
    $.validator.addMethod("noSpace", (value, element) => {
		if( $(element).attr('required') ) {
			return value.search(/^(?! *$)[^]+$/) == 0;
		}

		return true;
	}, 'Please fill this empty field.');

    /*
	Assign Custom Rules on Fields
	*/
    $.validator.addClassRules({
	    'form-control': {
	        noSpace: true
	    }
	});

    /*
	Contact Form: Basic
	*/
    $('.contact-form').each(function(){
		$(this).validate({
			errorPlacement(error, element) {
				if(element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
					error.appendTo(element.closest('.form-group'));
				} else if( element.is('select') && element.closest('.custom-select-1') ) {
					error.appendTo(element.closest('.form-group'));
				} else {
					if( element.closest('.form-group').length ) {
						error.appendTo(element.closest('.form-group'));
					} else {
						error.insertAfter(element);
					}
				}
			},
			submitHandler(form) {

				const $form = $(form), $messageSuccess = $form.find('.contact-form-success'), $messageError = $form.find('.contact-form-error'), $submitButton = $(this.submitButton), $errorMessage = $form.find('.mail-error-message'), submitButtonText = $submitButton.val();

				$submitButton.val( $submitButton.data('loading-text') ? $submitButton.data('loading-text') : 'Loading...' ).attr('disabled', true);

				// Fields Data
				const formData = $form.serializeArray(), data = {};

				$(formData).each((index, {name, value}) => {
					if( data[name] ) {
						data[name] = data[name] + ', ' + value;						
					} else {
						data[name] = value;
					}
				});

				// Google Recaptcha v2
				if( data["g-recaptcha-response"] != undefined ) {
					data["g-recaptcha-response"] = $form.find('#g-recaptcha-response').val();
				}

				// Ajax Submit
				$.ajax({
					type: 'POST',
					url: $form.attr('action'),
					data
				}).always(({response, errorMessage, responseText}, textStatus, jqXHR) => {

					$errorMessage.empty().hide();

					if (response == 'success') {

						// Uncomment the code below to redirect for a thank you page
						// self.location = 'thank-you.html';

						$messageSuccess.removeClass('d-none');
						$messageError.addClass('d-none');

						// Reset Form
						$form.find('.form-control')
							.val('')
							.blur()
							.parent()
							.removeClass('has-success')
							.removeClass('has-danger')
							.find('label.error')
							.remove();

						if (($messageSuccess.offset().top - 80) < $(window).scrollTop()) {
							$('html, body').animate({
								scrollTop: $messageSuccess.offset().top - 80
							}, 300);
						}

						$form.find('.form-control').removeClass('error');

						$submitButton.val( submitButtonText ).attr('disabled', false);
						
						return;

					} else if (response == 'error' && typeof errorMessage !== 'undefined') {
						$errorMessage.html(errorMessage).show();
					} else {
						$errorMessage.html(responseText).show();
					}

					$messageError.removeClass('d-none');
					$messageSuccess.addClass('d-none');

					if (($messageError.offset().top - 80) < $(window).scrollTop()) {
						$('html, body').animate({
							scrollTop: $messageError.offset().top - 80
						}, 300);
					}

					$form.find('.has-success')
						.removeClass('has-success');
						
					$submitButton.val( submitButtonText ).attr('disabled', false);

				});
			}
		});
	});
})).apply(this, [jQuery]);

window.PARAM={},(function(e,o){e=e||{};var t=function(e,o){return this.initialize(e,o)};t.defaults={cookieBarShowDelay:2e3},t.prototype={initialize:function(e,o){return this.$el=e,this.setData().setOptions(o).build().events(),this},setData:function(){return this.$el.data("__ck",this),this},setOptions:function(e){return this.options=o.extend(!0,{},t.defaults,e,{wrapper:this.$el}),this},build:function(){var e=this;if(o.cookie("cookie-privacy-bar")||setTimeout(function(){e.options.wrapper.addClass("show")},e.options.cookieBarShowDelay),o.cookie("cookie-gdpr-preferences"))for(var t=o.cookie("cookie-gdpr-preferences").split(","),i=0;i<t.length;i++)o('input[value="'+t[i]+'"]').get(0)&&o('input[value="'+t[i]+'"]').is(":checkbox")&&o('input[value="'+t[i]+'"]').prop("checked",!0);return this},events:function(){var e=this;return e.options.wrapper.find(".gdpr-agree-trigger").on("click",function(t){t.preventDefault(),o.cookie("cookie-privacy-bar",!0),e.removeCookieBar()}),e.options.wrapper.find(".gdpr-preferences-trigger").on("click",function(e){e.preventDefault(),o(".gdpr-preferences-popup").toggleClass("show")}),o(".gdpr-close-popup").on("click",function(e){e.preventDefault(),o(".gdpr-preferences-popup").toggleClass("show")}),o(".gdpr-preferences-popup").on("click",function(e){o(e.target).closest(".gdpr-preferences-popup-content").get(0)||o(".gdpr-preferences-popup").toggleClass("show")}),o(".gdpr-preferences-form").on("submit",function(t){t.preventDefault();var i=o(this);i.find('button[type="submit"]').text("En cours...");var r=[];i.find(".gdpr-input").each(function(){(o(this).is(":checkbox")&&o(this).is(":checked")||o(this).is(":hidden"))&&r.push(o(this).val())}),o.cookie("cookie-privacy-bar",!0),o.cookie("cookie-gdpr-preferences",r),o.ajax({type:"post",url:"./actions/cookies-popup-sessions.php",data:{cookie_array:r},success:function(){}}),setTimeout(function(){i.find('button[type="submit"]').text("Enregistr\xe9e!").removeClass("btn-primary").addClass("btn-success"),setTimeout(function(){o(".gdpr-preferences-popup").toggleClass("show"),e.removeCookieBar(),i.find('button[type="submit"]').text("Sauvegarder").removeClass("btn-success").addClass("btn-primary"),location.reload()},500)},1e3)}),o(".gdpr-reset-cookies").on("click",function(t){t.preventDefault(),e.clearCookies(),location.reload(),o.ajax({type:"post",url:"./actions/cookies-popup-sessions.php",data:{cookie_array:[]},success:function(){}})}),o(".gdpr-open-preferences").on("click",function(e){e.preventDefault(),o(".gdpr-preferences-popup").toggleClass("show")}),this},removeCookieBar:function(){return this.options.wrapper.removeClass("show"),this},clearCookies:function(){return o.removeCookie("cookie-privacy-bar"),o.removeCookie("cookie-gdpr-preferences"),this}},o.extend(e,{COOKIESPOP:t}),o.fn.PARAMCOOKIESPOP=function(e){return this.map(function(){var i=o(this);return i.data("__ck")?i.data("__ck"):new t(i,e)})}}).apply(this,[window.PARAM,jQuery]),(function(e){"use strict";e.isFunction(e.fn.PARAMCOOKIESPOP)&&e(function(){e("[cookies-popup]:not(.manual)").each(function(){e(this).PARAMCOOKIESPOP(void 0)})})}).apply(this,[jQuery]);