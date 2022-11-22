$(document).ready(function() {
    var incrementPlus;
    var incrementMinus;

    var buttonPlus = $(".cart-qty-plus");
    var buttonMinus = $(".cart-qty-minus");

    var incrementPlus = buttonPlus.click(function() {
        var $n = $(this)
            .parent(".button-container")
            .parent(".container")
            .find(".qty");
        $n.val(Number($n.val()) + 1);
    });

    var incrementMinus = buttonMinus.click(function() {
        var $n = $(this)
            .parent(".button-container")
            .parent(".container")
            .find(".qty");
        var amount = Number($n.val());
        if (amount > 0) {
            $n.val(amount - 1);
        }
    });

    $("#select-files").change(function() {
        $('.value').text($(this).val());
        $('.value').val($(this).val());
    });

    $('.selectzone-popup table td input').click(function() {
        $(this).parent().parent('tr').addClass('active');
        $(this).parent().parent('tr').siblings().removeClass('active');
    });

    $('.sign-in .form .icons i.show').click(function() {
        let dataShow = $('#hide').attr('type');
        if (dataShow == 'text') {
            $('#hide').attr('type', 'password');
        } else {
            $('#hide').attr('type', 'text');
        }
    });


    $(function() {
        $('.switch input').on("click", function() {
            $(this).parent().toggleClass('active');
        });
    });

    /*otp code*/
    $('.digit-group').find('input').each(function() {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function(e) {
            var parent = $($(this).parent());
            if (e.keyCode === 8 || e.keyCode === 37) {
                var prev = parent.find('input#' + $(this).data('previous'));
                if (prev.length) {
                    $(prev).select();
                }
            } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                var next = parent.find('input#' + $(this).data('next'));
                if (next.length) {
                    $(next).select();
                } else {
                    if (parent.data('autosubmit')) {
                        parent.submit();
                    }
                }
            }
        });
    });


});






interact('.resize-drag')
    .resizable({
        // resize from all edges and corners
        edges: {
            left: true,
            right: true,
            bottom: true,
            top: true
        },

        listeners: {
            move(event) {
                var target = event.target
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)
                var c = (parseFloat(target.getAttribute('data-c')) || 0)
                var d = (parseFloat(target.getAttribute('data-d')) || 0)

                // var z = (parseFloat(target.getAttribute('data-z')) || 1)
                // var d = (parseFloat(target.getAttribute('data-d')) || 2)

                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'

                // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top

                c += event.deltaRect.bottom
                d += event.deltaRect.right

                // z += event.deltaRect.bottom
                // d += event.deltaRect.right

                target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

                // target.style.transform = 'translate(' + z + 'px,' + d + 'px)'

                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
                target.setAttribute('data-c', c)
                target.setAttribute('data-d', d)

                let datatX = $('.resize-drag').attr('data-x');
                let datatY = $('.resize-drag').attr('data-y');
                let datatc = $('.resize-drag').attr('data-c');
                let datatz = $('.resize-drag').attr('data-d');

                $('.first').text(Math.round(datatX, 100));
                $('.second').text(Math.round(datatY, 100));
                $('.three').text(Math.round(datatc, 100));
                $('.four').text(Math.round(datatz, 100));


                // target.setAttribute('data-z', z)
                // target.setAttribute('data-d', d)

                console.log(Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height))
                    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
            }
        },
        modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent'
            }),

            // minimum size
            interact.modifiers.restrictSize({
                min: {
                    width: 100,
                    height: 50
                }
            })
        ],

        inertia: true
    })
    .draggable({
        listeners: {
            move: window.dragMoveListener
        },
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                // restriction: 'parent',
                // endOnly: true
            })
        ]
    })