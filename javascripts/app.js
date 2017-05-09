//"use strict";
window.sats = {
    landing: false,
    home: false,
    sidebar: false,
    video: false,
    chapter: {
        one: {
            one: false
        },
        two: {
            one: false,
            two: false
        },
        four: {
            two: false
        },
        five: {
            one: false,
            two: false
        },
        six: {
            four: false
        },
        seven: {
            two: false
        },
        eight: {
            two: false,
            four: false
        }
    }
};

(function() {
    $(document).ready(function() {
        $("[data-prev-chapter]").on("click", function() {
            window.location.href = $(this).data("prev-chapter");
        });
        $("[data-next-chapter]").on("click", function() {
            window.location.href = $(this).data("next-chapter");
        });
        $("[data-finish-chapter]").on("click", function() {
            alert("finish");
            window.location.href = $(this).data("finish-chapter");
        });
        $("[data-answer-chapter='yes']").on("click", function() {
            alert("Correct");
            window.location.href = "/pages/chapter_2_3.html";
        });
        $("[data-answer-chapter='no']").on("click", function() {
            alert("Wrong");
        });
    });
})();

// sats testing
// sats UI
// sats Function
$("#changeChapter").on("change", function() {
    var val = $(this).val();
    window.location.href = val;
});

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentResponsiveText, SidebarMenuWidth;
        ContentResponsiveText = function() {
            $(".sidebar-title").fitText(1.8);
            $(".sidebar-text .grow").fitText(.55);
            $(".sidebar-text .with").fitText(.55);
            $(".sidebar-text .sats").fitText(.55);
            $(".side-navbar-nav").fitText(1.6);
            $(".side-navbar-nav .submenu").fitText(1.8);
        };
        SidebarMenuWidth = function() {
            var ratio = 706 / 861;
            //706 width / 861 height;
            $(".side-container").css("width", $(window).height() * ratio);
            $(".sidebar-burger").css("top", parseInt(($(window).height() - $(".sidebar-burger").height()) / 2) + "px");
            $(".sidebar-navigation").css("maxHeight", $(window).height() / 2);
            $(".sidebar-navigation").css("marginTop", parseInt($(".sidebar-title").outerHeight() + 40 + 10 + ($(window).height() - $(".side-navbar-nav").height() * 1.5) / 2) / 2 + "px");
            // 40 is close menu height
            //$(".sidebar-close").css("left", Math.max(0, ($(".sidebar-navigation").offset().left + "px")));
            //$(".sidebar-close").css("top", Math.max(0, (($(window).height() - $(".sidebar-navigation").offset().top ) / 3.2)) + "px");
            $(".sidebar-close").css("top", parseInt(($(window).height() - $(".sidebar-burger").height()) / 2) + "px");
            $(".sidebar-padding").css("top", parseInt(parseInt($(window).height() - $(".sidebar-padding").height() * 1.2) / 2));
        };
        $(document).ready(function() {
            ContentResponsiveText();
            setInterval(function() {
                SidebarMenuWidth();
                $(".sidebar-title").trigger("resize.fittext");
            }, 20);
        });
    };
    EVENT = function() {
        $(".sidebar-toggle").on("click", function() {
            // $(".sidebar-menu").toggleClass("active");
            // $(".sidebar-navigation").toggleClass("active");
            // $(".sidebar-padding").toggleClass("active");
            // $(".sidebar-close").toggleClass("active");
            $(".sidebar-menu").toggleClass("active");
            $(".sidebar-navigation").toggleClass("active");
            $(".sidebar-padding").toggleClass("active");
            $(".sidebar-close").toggleClass("active");
        });
        $(".sidebar-close").on("click", function() {
            $(".sidebar-menu").toggleClass("active");
            $(".sidebar-navigation").toggleClass("active");
            $(".sidebar-padding").toggleClass("active");
            $(".sidebar-close").toggleClass("active");
        });
        $(".side-navbar-nav .main").on("click", function() {
            $(".side-navbar-nav .main").removeClass("active");
            $(this).addClass("active");
        });
    };
    window.sats.sidebar = {
        init: function() {
            UI();
            EVENT();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, VideoScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
            $(".page-video").css("min-height", window_height);
        };
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-video .video-container .video").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-video .video-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-video .video-container").outerHeight()) / 2) + "px");
            $(".page-video .video-container").css("left", Math.max(0, ($(window).width() - $(".page-video .video-container .video-frame").outerWidth()) / 2) + "px");
        };
        VideoScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".video-container").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", videoHeight + "px");
            $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("width", videoWidth + "px");
            $(".video-action").css("width", videoWidth + "px");
        };
        $(document).ready(function() {
            $("map").imageMapResize();
            setInterval(function() {
                ContentMinHeight();
                VideoScreen();
                MenuMinHeight();
            }, 20);
        });
    };
    EVENT = function() {
        var satsVideo = videojs("SatsVideo");
        function launchIntoFullscreen(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
        $(".video-pause").on("click", function() {
            satsVideo.pause();
        });
        $(".video-play").on("click", function() {
            satsVideo.play();
        });
        $(".video-restart").on("click", function() {
            //satsVideo.pause();
            satsVideo.currentTime(0);
        });
        $(".video-enlarge").on("click", function() {
            launchIntoFullscreen(document.getElementById("SatsVideo_html5_api"));
        });
    };
    window.sats.video = {
        init: function() {
            UI();
            EVENT();
            window.sats.sidebar.init();
        }
    };
})($);

(function($) {
    var UI;
    UI = function() {
        var ContentMinHeight, ContentResponsiveText, CenterImage, ActionPadding;
        ContentMinHeight = function() {
            var window_height = $(window).height();
            $(".page-landing").css("min-height", window_height);
        };
        ContentResponsiveText = function() {
            $(".page-landing .title span").fitText(3.5);
            $(".page-landing .title").fitText(2.5);
            $(".page-landing a.button-start").fitText(4.5);
        };
        CenterImage = function() {
            $(".page-landing .img-human").css("top", parseInt(($(window).height() - $(".page-landing .img-human").outerHeight()) / 2) + "px");
            $(".page-landing .img-human").css("left", parseInt(($(window).width() - $(".page-landing .img-human").outerWidth()) / 2) + "px");
        };
        ActionPadding = function() {
            $(".page-landing .action").css("top", parseInt($(".page-landing .img-human").offset().top + $(".page-landing .img-human").outerHeight() * .85) + "px");
        };
        $(document).ready(function() {
            //ContentMinHeight();
            ContentResponsiveText();
            //CenterImage();
            //ActionPadding();
            setInterval(function() {
                ContentMinHeight();
                CenterImage();
                ActionPadding();
            }, 20);
        });
    };
    window.sats.landing = {
        init: function() {
            UI();
        }
    };
})($);

(function($) {
    var UI;
    UI = function() {
        var ContentMinHeight, MenuMinHeight;
        ContentMinHeight = function() {
            var window_height = $(window).height();
            $(".page-home").css("min-height", window_height);
        };
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-home .home-container:visible .home").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-home .home-container:visible").css("top", Math.max(0, ($(window).height() + 50 + 10 - $(".page-home .home-container:visible .home").outerHeight()) / 2) + "px");
            $(".page-home .home-container:visible").css("left", Math.max(0, ($(window).width() - $(".page-home .home-container:visible .home").outerWidth()) / 2) + "px");
        };
        $(document).ready(function() {
            $("map").imageMapResize();
            setInterval(function() {
                ContentMinHeight();
                MenuMinHeight();
            }, 20);
        });
    };
    window.sats.home = {
        init: function() {
            UI();
            window.sats.sidebar.init();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, QuestionScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
            $(".page-question").css("min-height", window_height);
        };
        ContentResponsiveText = function() {
            $(".page-chapter .placeholder-title span").fitText(3.5);
            $(".page-chapter .placeholder-title").fitText(2.5);
        };
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-chapter .chapter-container .chapter-div").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter .chapter-container").css("left", Math.max(0, ($(window).width() - $(".page-chapter .chapter-container .chapter-frame").outerWidth()) / 2) + "px");
            $(".page-chapter-one .chapter-container .chapter-div").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter-one .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter-one .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter-one .chapter-container").css("left", -Math.max(0, $(".page-chapter-one .chapter-container").outerWidth() / 2) + "px");
        };
        QuestionScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".chapter-container").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".page-chapter .chapter-container .chapter-div").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .chapter-div").css("width", videoWidth + "px");
            $(".page-chapter-one .chapter-container .chapter-div").css("height", videoHeight + "px");
            $(".page-chapter-one .chapter-container .chapter-div").css("width", videoWidth + "px");
            $(".chapter-action").css("width", videoWidth + "px");
            $(".page-chapter .chapter-container .start-container").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .start-container").css("width", videoWidth + "px");
            $(".page-chapter .chapter-container .end-container").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .end-container").css("width", videoWidth + "px");
        };
        EventFunction = function() {
            if ($("#SatsVideo").length) {
                var satsVideo = videojs("SatsVideo").ready(function() {
                    var player = this;
                    url = $($(this)[0].el()).data("complete");
                    player.on("ended", function() {
                        $(".end-container").addClass("active");
                    });
                });
                $(".video-pause").on("click", function() {
                    satsVideo.pause();
                });
                $(".video-play").on("click", function() {
                    $(".start-container").removeClass("active");
                    $(".end-container").removeClass("active");
                    satsVideo.play();
                });
                $(".video-restart").on("click", function() {
                    $(".start-container").removeClass("active");
                    $(".end-container").removeClass("active");
                    satsVideo.currentTime(0).play();
                });
            }
        };
        $(document).ready(function() {
            $("map").imageMapResize();
            setInterval(function() {
                ContentMinHeight();
                QuestionScreen();
                MenuMinHeight();
                EventFunction();
                ContentResponsiveText();
            }, 20);
        });
    };
    EVENT = function() {};
    window.sats.chapter.one.one = {
        init: function() {
            UI();
            EVENT();
            window.sats.sidebar.init();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, QuestionScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
            $(".page-question").css("min-height", window_height);
        };
        ContentResponsiveText = function() {
            $(".page-chapter .placeholder-title span").fitText(3.5);
            $(".page-chapter .placeholder-title").fitText(2.5);
        };
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-chapter .chapter-container .chapter-div").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter .chapter-container").css("left", Math.max(0, ($(window).width() - $(".page-chapter .chapter-container .chapter-frame").outerWidth()) / 2) + "px");
            $(".page-chapter-one .chapter-container .chapter-div").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter-one .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter-one .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter-one .chapter-container").css("left", -Math.max(0, $(".page-chapter-one .chapter-container").outerWidth() / 2) + "px");
        };
        QuestionScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".chapter-container").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".page-chapter .chapter-container .chapter-div").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .chapter-div").css("width", videoWidth + "px");
            $(".page-chapter-one .chapter-container .chapter-div").css("height", videoHeight + "px");
            $(".page-chapter-one .chapter-container .chapter-div").css("width", videoWidth + "px");
            $(".chapter-action").css("width", videoWidth + "px");
            $(".page-chapter .chapter-container .start-container").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .start-container").css("width", videoWidth + "px");
            $(".page-chapter .chapter-container .end-container").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .end-container").css("width", videoWidth + "px");
        };
        EventFunction = function() {
            if ($("#SatsVideo").length) {
                var satsVideo = videojs("SatsVideo").ready(function() {
                    var player = this;
                    url = $($(this)[0].el()).data("complete");
                    player.on("ended", function() {
                        $(".end-container").addClass("active");
                    });
                });
                $(".video-pause").on("click", function() {
                    satsVideo.pause();
                });
                $(".video-play").on("click", function() {
                    $(".start-container").removeClass("active");
                    $(".end-container").removeClass("active");
                    satsVideo.play();
                });
                $(".video-restart").on("click", function() {
                    $(".start-container").removeClass("active");
                    $(".end-container").removeClass("active");
                    satsVideo.currentTime(0).play();
                });
            }
        };
        $(document).ready(function() {
            $("map").imageMapResize();
            setInterval(function() {
                ContentMinHeight();
                QuestionScreen();
                MenuMinHeight();
                EventFunction();
                ContentResponsiveText();
            }, 20);
        });
    };
    EVENT = function() {};
    window.sats.chapter.two.one = {
        init: function() {
            UI();
            EVENT();
            window.sats.sidebar.init();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, QuestionScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
            $(".page-question").css("min-height", window_height);
        };
        ContentResponsiveText = function() {
            $(".page-chapter .placeholder-title span").fitText(3.5);
            $(".page-chapter .placeholder-title").fitText(2.5);
        };
        MenuMinHeight = function() {
            //$(".page-home .").css("min-height", window_height);
            var maxHeight = $(window).height() - 50 - 20;
            $(".page-chapter .chapter-container .chapter-div:visible").css("maxHeight", maxHeight + "px");
            // 50 = topbar height, 20 = padding height
            var chapterContainerHeight = parseInt(($(window).height() + 50 + 10 - $(".page-chapter .chapter-container:visible").outerHeight()) / 2);
            $(".page-chapter .chapter-container:visible").css("top", chapterContainerHeight + "px").css("left", Math.max(0, ($(window).width() - $(".page-chapter .chapter-container .chapter-frame:visible").outerWidth()) / 2) + "px");
            $(".page-chapter-two .chapter-container .chapter-div:visible").css("maxHeight", maxHeight + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter-two .chapter-container:visible").css("top", chapterContainerHeight + "px").css("left", -Math.max(0, $(".page-chapter-two .chapter-container:visible").outerWidth() / 2) + "px");
            if ($(".page-chapter-2_2_1").length) {
                $(".page-chapter-2_2_1 .chapter-container:visible").css("top", parseInt(($(window).height() - $(".page-chapter-2_2_1 .chapter-container:visible").outerHeight()) / 2) + "px");
            }
        };
        QuestionScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".chapter-container:visible").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".page-chapter .chapter-container .chapter-div:visible").css("height", videoHeight + "px").css("width", videoWidth + "px");
            $(".page-chapter-two .chapter-container .chapter-div:visible").css("height", videoHeight + "px").css("width", videoWidth + "px");
            $(".chapter-action:visible").css("width", videoWidth + "px");
            $(".page-chapter .chapter-container .start-container:visible").css("height", videoHeight + "px").css("width", videoWidth + "px");
            $(".page-chapter .chapter-container .end-container:visible").css("height", videoHeight + "px").css("width", videoWidth + "px");
            if ($(".page-chapter-2_2_1").length) {
                var videoHeight = $(window).height() * .9;
                var perHeight = videoHeight / 9;
                var videoWidth = perHeight * 16;
                while (videoWidth > $(".chapter-container").outerWidth()) {
                    perHeight = perHeight - 1;
                    videoWidth = perHeight * 16;
                    videoHeight = perHeight * 9;
                }
                $(".page-chapter-2_2_1 .chapter-container .chapter-div:visible").css("height", videoHeight + "px").css("width", videoWidth + "px");
            }
        };
        EventFunction = function() {
            if ($("#SatsVideo").length) {
                var satsVideo = videojs("SatsVideo").ready(function() {
                    var player = this;
                    url = $($(this)[0].el()).data("complete");
                    player.on("ended", function() {
                        $(".end-container").addClass("active");
                    });
                });
                $(".video-pause").on("click", function() {
                    satsVideo.pause();
                });
                $(".video-play").on("click", function() {
                    $(".start-container").removeClass("active");
                    $(".end-container").removeClass("active");
                    satsVideo.play();
                });
                $(".video-restart").on("click", function() {
                    $(".start-container").removeClass("active");
                    $(".end-container").removeClass("active");
                    satsVideo.currentTime(0).play();
                });
            }
        };
        ContentScreen = function() {
            $(".frame-question:visible").outerWidth($(".frame:visible").outerWidth() - $(".frame-title:visible").outerWidth() - 1);
            $(".frame-title span").fitText(.4);
            $(".frame-title").fitText(1);
            $(".frame-question").fitText(3);
            $(".frame-answer a.answerlink").fitText(3.2);
            $(".frame-answer a.text-long").fitText(4);
            $(".frame-answer a.text-extra-long").fitText(4.5);
            //$(".frame-answer a.answersubmit").fitText(1);
            $(".page-chapter-2_2_1 .frame:visible").css("height", $(".page-chapter-2_2_1 .mca:visible").height() * .8);
            $(".page-chapter-2_2_1 .frame:visible").css("marginTop", $(".page-chapter-2_2_1 .mca:visible").height() * .1);
            $(".page-chapter-2_2_1 .frame-answer:visible").css("height", $(".page-chapter-2_2_1 .frame:visible").height() - $(".page-chapter-2_2_1 .frame-title:visible").height() - 20);
            $(".page-chapter-2_2_1 .frame-answer:visible").css("top", $(".page-chapter-2_2_1 .frame-title:visible").height());
            $(".page-chapter-2_2_1 .frame-explain:visible").css("height", $(".page-chapter-2_2_1 .frame:visible").height() - 20);
            $(".page-chapter-2_2_1 .frame-completed:visible").css("height", $(".page-chapter-2_2_1 .frame:visible").height() - 20);
        };
        ContentEventFunction = function() {
            var lastroom = "";
            function change_room(room) {
                $(".chapter-div").removeClass("active");
                $(".frame-answer a").removeClass("active");
                $(room).addClass("active");
            }
            $("[data-lastroom]").on("click", function() {
                lastroom = $(this).data("lastroom");
            });
            // $("[data-lastroom-trigger]").on("click", function(){
            //   change_room(lastroom);
            // });
            $(".scene-one").on("click", function() {
                change_room(".scene-two");
            });
            $(".frame-answer a.answerlink").on("click", function() {
                $(".frame-answer a.answerlink").removeClass("active");
                $(this).addClass("active");
                $(this).parent().find(".answersubmit").addClass("active");
            });
            $(".frame-answer .answersubmit").on("click", function() {
                change_room($(".frame-answer a.answerlink.active").data("path"));
                $(".frame-action").css({
                    display: "none"
                });
                $(".frame-action").delay(200).fadeIn();
            });
            function switchFinalImage(checked, element) {
                return checked ? element.css({
                    display: "inline"
                }).attr("src", "../images/2_2/landingpage_box_hover_done.png") : false;
            }
            var overtimeFinal = null, leaveFinal = null, injuryFinal = null, employmentFinal = null, childcareFinal = null, maternityFinal = null;
            $(".final-overtime").on("click", function() {
                overtimeFinal = "true";
                localStorage.setItem("overtimeFinal", overtimeFinal);
            });
            switchFinalImage(localStorage.getItem("overtimeFinal"), $(".check-overtime > .box-hover"));
            $(".final-leave").on("click", function() {
                leaveFinal = "true";
                localStorage.setItem("leaveFinal", leaveFinal);
            });
            switchFinalImage(localStorage.getItem("leaveFinal"), $(".check-leave > .box-hover"));
            $(".final-injury").on("click", function() {
                leaveFinal = "true";
                localStorage.setItem("injuryFinal", leaveFinal);
            });
            switchFinalImage(localStorage.getItem("injuryFinal"), $(".check-injury > .box-hover"));
            leaveFinal = localStorage.getItem("injuryFinal");
            $(".final-employment").on("click", function() {
                employmentFinal = "true";
                localStorage.setItem("employmentFinal", employmentFinal);
            });
            switchFinalImage(localStorage.getItem("employmentFinal"), $(".check-re-employment > .box-hover"));
            $(".final-childcare").on("click", function() {
                childcareFinal = "true";
                localStorage.setItem("childcareFinal", childcareFinal);
            });
            switchFinalImage(localStorage.getItem("childcareFinal"), $(".check-childcare-leave > .box-hover"));
            $(".final-maternity").on("click", function() {
                maternityFinal = "true";
                localStorage.setItem("maternityFinal", maternityFinal);
            });
            switchFinalImage(localStorage.getItem("maternityFinal"), $(".check-maternity-leave > .box-hover"));
            $(".frame-explain .btn-continue").on("click", function() {
                change_room($(this).data("path"));
                ContentScreen();
            });
            $(".frame-explain .btn-continue-end").on("click", function() {
                $(".chapter-div:visible .scene-completed").addClass("active");
            });
            $(".frame-answer .answernext").on("click", function() {
                change_room($(this).data("path"));
                ContentScreen();
            });
            $(".frame-answer .answerend").on("click", function() {
                $(".chapter-div:visible .scene-completed").addClass("active");
            });
        };
        $(document).ready(function() {
            $("map").imageMapResize();
            EventFunction();
            ContentEventFunction();
            setInterval(function() {
                ContentMinHeight();
                QuestionScreen();
                MenuMinHeight();
                ContentResponsiveText();
                ContentScreen();
            }, 50);
        });
    };
    EVENT = function() {};
    window.sats.chapter.two.two = {
        init: function() {
            UI();
            EVENT();
            window.sats.sidebar.init();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, QuestionScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
        };
        ContentResponsiveText = function() {};
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-chapter .chapter-container .chapter-div:visible").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter .chapter-container").css("left", Math.max(0, ($(window).width() - $(".page-chapter .chapter-container .chapter-frame").outerWidth()) / 2) + "px");
            if ($(".page-chapter-4_2_1").length) {
                $(".page-chapter-4_2_1 .chapter-container:visible").css("top", parseInt(($(window).height() - $(".page-chapter-4_2_1 .chapter-container").outerHeight()) / 2) + "px");
            }
        };
        QuestionScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".chapter-container").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".page-chapter .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            $(".chapter-action").css("width", videoWidth + "px");
            if ($(".page-chapter-4_2_1").length) {
                var videoHeight = $(window).height() * .9;
                var perHeight = videoHeight / 9;
                var videoWidth = perHeight * 16;
                while (videoWidth > $(".chapter-container").outerWidth()) {
                    perHeight = perHeight - 1;
                    videoWidth = perHeight * 16;
                    videoHeight = perHeight * 9;
                }
                $(".page-chapter-4_2_1 .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
                $(".page-chapter-4_2_1 .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            }
        };
        // after select cannot select again
        $(".answer").on("click", function() {
            $(".answer").css("pointer-events", "none");
        });
        $(".button-question-continue").on("click", function() {
            $(".answer").css("pointer-events", "auto");
        });
        EventFunction = function() {
            // count how many true , if user select true == maximum true, it will mark it as complete
            var maxCount = $("[data-answer-selected='1']").length;
            var count = 0;
            $("[data-answer-selected]").on("click", function() {
                var id = $(this).data("answer-selected");
                var targetExplain = $(this).data("target-id");
                $("#questionAAnswerRoom").find(".correct-frame").removeClass("active");
                $("#questionAAnswerRoom").find(".wrong-frame").removeClass("active");
                $("[data-target-explain]").removeClass("active");
                $("[data-target-explain='" + targetExplain + "']").addClass("active");
                if (id == "1" || id == 1) {
                    $(this).addClass("correct");
                    $("#questionAAnswerRoom").find(".correct-frame").addClass("active");
                    if ($(this).hasClass("triggered")) {} else {
                        $(this).addClass("triggered");
                        count = count + 1;
                    }
                    if (count >= maxCount) {
                        $("#questionAAnswerRoom").removeClass("active");
                        $(".wrong-frame").removeClass("active");
                        $(".wrong-frame").removeClass("active");
                        $("#questionZero").addClass("active");
                    }
                } else {
                    $(this).addClass("wrong");
                    $("#questionAAnswerRoom").find(".wrong-frame").addClass("active");
                }
            });
            $(".title_selection").on("click", function() {
                $(".banner").attr("src", "../images/4_2/banner_update.jpg");
            });
            $("[data-remove-frame]").on("click", function() {
                $("#questionAAnswerRoom").find(".correct-frame").removeClass("active");
                $("#questionAAnswerRoom").find(".wrong-frame").removeClass("active");
            });
            $("[data-remove-active]").on("click", function() {
                var activeID = $(this).data("remove-active");
                $(activeID).removeClass("active");
                $(activeID).find(".content").removeClass("active");
            });
            $("[data-switch-room]").on("click", function() {
                var id = $(this).data("switch-room");
                $(".landing-div").removeClass("active");
                $(id).addClass("active");
            });
            $("[data-scene-answer]").on("click", function() {
                var val = $(this).data("scene-answer");
                var targetID = $(this).data("scene-select");
                $(targetID).find(".wrong-frame").removeClass("active");
                $(targetID).find(".correct-frame").removeClass("active");
                $("[data-scene-answer]").removeClass("active");
                $(this).addClass("active");
                if (val) {
                    $(targetID).find(".correct-frame").addClass("active");
                } else {
                    $(targetID).find(".wrong-frame").addClass("active");
                }
            });
            $("[data-switch-knowmoreroom]").on("click", function() {
                var targetID = $(this).data("switch-knowmoreroom");
                $(targetID).find(".explain-frame").addClass("active");
            });
            $("[data-inner-room]").on("click", function() {
                var answer = $(this).data("inner-room");
                $(this).parent().parent().find(".answer-frame").removeClass("active");
                if (answer == "correct") {
                    $(this).parent().parent().find(".correct-frame").addClass("active");
                    $(this).parent().parent().find(".correct-frame > .text, .button-question-continue, .bg-feedback").css({
                        display: "none"
                    });
                    $(this).parent().parent().find(".correct-frame > .text, .button-question-continue, .bg-feedback").delay(200).fadeIn();
                } else {
                    $(this).parent().parent().find(".wrong-frame").addClass("active");
                    $(this).parent().parent().find(".wrong-frame > .text, .button-question-continue, .bg-feedback").css({
                        display: "none"
                    });
                    $(this).parent().parent().find(".wrong-frame > .text, .button-question-continue, .bg-feedback").delay(200).fadeIn();
                }
            });
        };
        ContentScreen = function() {};
        ContentEventFunction = function() {};
        $(document).ready(function() {
            EventFunction();
            ContentEventFunction();
            setInterval(function() {
                ContentMinHeight();
                QuestionScreen();
                MenuMinHeight();
                ContentResponsiveText();
                ContentScreen();
            }, 20);
        });
    };
    EVENT = function() {};
    window.sats.chapter.four.two = {
        init: function() {
            UI();
            EVENT();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, QuestionScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
        };
        ContentResponsiveText = function() {};
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-chapter .chapter-container .chapter-div:visible").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter .chapter-container").css("left", Math.max(0, ($(window).width() - $(".page-chapter .chapter-container .chapter-frame").outerWidth()) / 2) + "px");
            if ($(".page-chapter-5_2_1").length) {
                $(".page-chapter-5_2_1 .chapter-container:visible").css("top", parseInt(($(window).height() - $(".page-chapter-5_2_1 .chapter-container").outerHeight()) / 2) + "px");
            }
        };
        QuestionScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".chapter-container").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".page-chapter .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            $(".chapter-action").css("width", videoWidth + "px");
            if ($(".page-chapter-5_2_1").length) {
                var videoHeight = $(window).height() * .9;
                var perHeight = videoHeight / 9;
                var videoWidth = perHeight * 16;
                while (videoWidth > $(".chapter-container").outerWidth()) {
                    perHeight = perHeight - 1;
                    videoWidth = perHeight * 16;
                    videoHeight = perHeight * 9;
                }
                $(".page-chapter-5_2_1 .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
                $(".page-chapter-5_2_1 .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            }
        };
        EventFunction = function() {
            $("[data-switch-room]").on("click", function() {
                var id = $(this).data("switch-room");
                $(".landing-div").removeClass("active");
                $(id).addClass("active");
            });
            $("[data-inner-room]").on("click", function() {
                var answer = $(this).data("inner-room");
                $(this).parent().parent().find(".answer-frame").removeClass("active");
                if (answer == "correct") {
                    $(this).parent().parent().find(".correct-frame").addClass("active");
                    $(this).parent().parent().find(".correct-frame > .text, .button-question-continue, .bg-feedback").css({
                        display: "none"
                    });
                    $(this).parent().parent().find(".correct-frame > .text, .button-question-continue, .bg-feedback").delay(200).fadeIn();
                } else {
                    $(this).parent().parent().find(".wrong-frame").addClass("active");
                    $(this).parent().parent().find(".wrong-frame > .text, .button-question-continue, .bg-feedback").css({
                        display: "none"
                    });
                    $(this).parent().parent().find(".wrong-frame > .text, .button-question-continue, .bg-feedback").delay(200).fadeIn();
                }
            });
        };
        ContentScreen = function() {};
        ContentEventFunction = function() {};
        $(document).ready(function() {
            EventFunction();
            ContentEventFunction();
            setInterval(function() {
                ContentMinHeight();
                QuestionScreen();
                MenuMinHeight();
                ContentResponsiveText();
                ContentScreen();
            }, 20);
        });
    };
    EVENT = function() {};
    window.sats.chapter.five.two = {
        init: function() {
            UI();
            EVENT();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, QuestionScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
        };
        ContentResponsiveText = function() {};
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-chapter .chapter-container .chapter-div:visible").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter .chapter-container").css("left", Math.max(0, ($(window).width() - $(".page-chapter .chapter-container .chapter-frame").outerWidth()) / 2) + "px");
            if ($(".page-chapter-6_4_1").length) {
                $(".page-chapter-6_4_1 .chapter-container:visible").css("top", parseInt(($(window).height() - $(".page-chapter-6_4_1 .chapter-container").outerHeight()) / 2) + "px");
            }
        };
        QuestionScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".chapter-container").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".page-chapter .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            $(".chapter-action").css("width", videoWidth + "px");
            if ($(".page-chapter-6_4_1").length) {
                var videoHeight = $(window).height() * .9;
                var perHeight = videoHeight / 9;
                var videoWidth = perHeight * 16;
                while (videoWidth > $(".chapter-container").outerWidth()) {
                    perHeight = perHeight - 1;
                    videoWidth = perHeight * 16;
                    videoHeight = perHeight * 9;
                }
                $(".page-chapter-6_4_1 .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
                $(".page-chapter-6_4_1 .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            }
        };
        EventFunction = function() {
            $("[data-switch-room]").on("click", function() {
                var id = $(this).data("switch-room");
                $(".landing-div").removeClass("active");
                $(id).addClass("active");
            });
            $(".answers-list").sortable({
                revert: true,
                connectWith: ".questions-list"
            });
            $(".questions-list").sortable({
                revert: true,
                connectWith: ".answers-list",
                receive: function(event, ui) {
                    var receiverID = ui.item.data("id");
                    var containerID = $(this).attr("id");
                    if (receiverID !== containerID) {
                        $(ui.placeholder).addClass("ui-state-error");
                        $(ui.sender).sortable("cancel");
                        $("." + containerID).find(".wrong").addClass("active");
                        $("." + containerID).find(".correct").removeClass("active");
                        $("[data-relator='" + containerID + "']").addClass("wrong");
                        setTimeout(function() {
                            $("." + containerID).find(".correct").addClass("active");
                            $("." + containerID).find(".wrong").removeClass("active");
                            $("[data-relator='" + containerID + "']").removeClass("wrong");
                        }, 1e3);
                    }
                    // everytime received an item , we will check it's finish or no
                    if ($(".answers-list").children("li").length == 0) {
                        // alert('finish scene, please confirm with sl the design');
                        $(".scene-one").removeClass("auto-flow");
                        $(".overlay-sucess").addClass("active");
                        ContentMinHeight();
                    }
                }
            });
        };
        ContentScreen = function() {};
        ContentEventFunction = function() {};
        $(document).ready(function() {
            EventFunction();
            ContentEventFunction();
            setInterval(function() {
                ContentMinHeight();
                QuestionScreen();
                MenuMinHeight();
                ContentResponsiveText();
                ContentScreen();
            }, 20);
        });
    };
    EVENT = function() {};
    window.sats.chapter.six.four = {
        init: function() {
            UI();
            EVENT();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, QuestionScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
        };
        ContentResponsiveText = function() {};
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-chapter .chapter-container .chapter-div:visible").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter .chapter-container").css("left", Math.max(0, ($(window).width() - $(".page-chapter .chapter-container .chapter-frame").outerWidth()) / 2) + "px");
            if ($(".page-chapter-7_2_1").length) {
                $(".page-chapter-7_2_1 .chapter-container:visible").css("top", parseInt(($(window).height() - $(".page-chapter-7_2_1 .chapter-container").outerHeight()) / 2) + "px");
            }
        };
        QuestionScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".chapter-container").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".page-chapter .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            $(".chapter-action").css("width", videoWidth + "px");
            if ($(".page-chapter-7_2_1").length) {
                var videoHeight = $(window).height() * .9;
                var perHeight = videoHeight / 9;
                var videoWidth = perHeight * 16;
                while (videoWidth > $(".chapter-container").outerWidth()) {
                    perHeight = perHeight - 1;
                    videoWidth = perHeight * 16;
                    videoHeight = perHeight * 9;
                }
                $(".page-chapter-7_2_1 .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
                $(".page-chapter-7_2_1 .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            }
        };
        EventFunction = function() {
            $("[data-switch-room]").on("click", function() {
                var id = $(this).data("switch-room");
                $(".landing-div").removeClass("active");
                $(id).addClass("active");
            });
            $("[data-close-inner]").on("click", function() {
                var id = $(this).data("close-inner");
                $("[data-knowmore-room-id='" + id + "']").removeClass("active");
            });
            $("[data-knowmore-room]").on("click", function() {
                var id = $(this).data("knowmore-room");
                $("[data-knowmore-room-id='" + id + "']").addClass("active");
            });
            $("[data-continue-exit]").on("click", function() {
                var id = $(this).data("continue-exit");
                if (id == "end") {
                    $(".scene-one").removeClass("auto-flow");
                    $(".overlay-sucess").addClass("active");
                    $("[data-only-one]").removeClass("active");
                    $("#chapter_ending").addClass("active");
                } else {
                    $("[data-knowmore-room-id='" + id + "']").removeClass("active");
                    $("[data-correct-id='" + id + "']").removeClass("active");
                }
            });
            $("[data-continue-wrong-frame]").on("click", function() {
                $(".wrong-frame").removeClass("active");
            });
            $(".answers-list").sortable({
                revert: true,
                connectWith: ".questions-list"
            });
            $(".questions-list").sortable({
                revert: true,
                connectWith: ".answers-list",
                receive: function(event, ui) {
                    var receiverID = ui.item.data("id");
                    var containerID = $(this).attr("id");
                    $("[data-correct-id]").removeClass("active");
                    if (receiverID !== containerID) {
                        $(ui.placeholder).addClass("ui-state-error");
                        $(ui.sender).sortable("cancel");
                        $("." + containerID).find(".wrong").addClass("active");
                        $("." + containerID).find(".correct").removeClass("active");
                        $("[data-id='" + receiverID + "']").addClass("wrong");
                        setTimeout(function() {
                            $("." + containerID).find(".correct").addClass("active");
                            $("." + containerID).find(".wrong").removeClass("active");
                            $("[data-id='" + receiverID + "']").removeClass("wrong");
                        }, 1e3);
                        $(".wrong-frame").addClass("active");
                    } else if (receiverID == "q6") {
                        $(".q6_image").attr("src", "../images/7_2/7_2.png");
                    } else {}
                    // everytime received an item , we will check it's finish or no
                    if ($(".answers-list").children("li").length == 0) {
                        $("[data-correct-id='" + receiverID + "']").addClass("active");
                        // alert('finish scene, please confirm with sl the design');
                        $("[data-continue-exit]").data("continue-exit", "end");
                        ContentMinHeight();
                    }
                }
            });
        };
        ContentScreen = function() {};
        ContentEventFunction = function() {};
        $(document).ready(function() {
            EventFunction();
            ContentEventFunction();
            setInterval(function() {
                ContentMinHeight();
                QuestionScreen();
                MenuMinHeight();
                ContentResponsiveText();
                ContentScreen();
            }, 20);
        });
    };
    EVENT = function() {};
    window.sats.chapter.seven.two = {
        init: function() {
            UI();
            EVENT();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, QuestionScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
        };
        ContentResponsiveText = function() {};
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-chapter .chapter-container .chapter-div:visible").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter .chapter-container").css("left", Math.max(0, ($(window).width() - $(".page-chapter .chapter-container .chapter-frame").outerWidth()) / 2) + "px");
            if ($(".page-chapter-8_2_1").length) {
                $(".page-chapter-8_2_1 .chapter-container:visible").css("top", parseInt(($(window).height() - $(".page-chapter-8_2_1 .chapter-container").outerHeight()) / 2) + "px");
            }
        };
        QuestionScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".chapter-container").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".page-chapter .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            $(".chapter-action").css("width", videoWidth + "px");
            if ($(".page-chapter-8_2_1").length) {
                var videoHeight = $(window).height() * .9;
                var perHeight = videoHeight / 9;
                var videoWidth = perHeight * 16;
                while (videoWidth > $(".chapter-container").outerWidth()) {
                    perHeight = perHeight - 1;
                    videoWidth = perHeight * 16;
                    videoHeight = perHeight * 9;
                }
                $(".page-chapter-8_2_1 .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
                $(".page-chapter-8_2_1 .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            }
        };
        EventFunction = function() {
            //number animation
            $(".number_animation").each(function() {
                $(this).prop("Counter", 30).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1e3,
                    easing: "swing",
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            $(".number_animation").fitText(.5);
            //end
            var targetAnswer = {};
            function submitOpen() {
                var totalCount = $("[data-answer-box]").length;
                var count = 0;
                for (var k in targetAnswer) {
                    if (targetAnswer.hasOwnProperty(k)) {
                        ++count;
                    }
                }
                if (count >= totalCount) {
                    // enable submit button if all answer is selected
                    $(".toggle-button").addClass("active");
                }
            }
            var evaluation_ans;
            var consideration_ans;
            var intention_ans;
            var medical_ans;
            var letter_ans;
            var confirmation_ans;
            //testing get ans
            $("[data-answer]").on("click", function() {
                var current_scene = $.trim($(this).parents(".answer-box").find(".name").text());
                var current_ans = this.getAttribute("data-answer");
                if (current_scene == "EVALUATION" && current_ans == 12) {
                    console.log("correct");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("correct");
                    evaluation_ans = true;
                    $(".block").css("z-index", "0");
                } else if (current_scene == "EVALUATION" && current_ans !== 12) {
                    console.log("wrong");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("wrong");
                    evaluation_ans = false;
                    $(".block").css("z-index", "9999999");
                }
                if (current_scene == "CONSIDERATION" && current_ans == 9) {
                    console.log("correct");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("correct");
                    consideration_ans = true;
                    $(".block").css("z-index", "0");
                } else if (current_scene == "CONSIDERATION" && current_ans !== 9) {
                    console.log("wrong");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("wrong");
                    consideration_ans = false;
                    $(".block").css("z-index", "9999999");
                }
                if (current_scene == "INTENTION" && current_ans == 8) {
                    console.log("correct");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("correct");
                    intention_ans = true;
                    $(".block").css("z-index", "0");
                } else if (current_scene == "INTENTION" && current_ans !== 8) {
                    console.log("wrong");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("wrong");
                    intention_ans = false;
                    $(".block").css("z-index", "9999999");
                }
                if (current_scene == "MEDICAL EXAMINATION" && current_ans == 6) {
                    console.log("correct");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("correct");
                    medical_ans = true;
                    $(".block").css("z-index", "0");
                } else if (current_scene == "MEDICAL EXAMINATION" && current_ans !== 6) {
                    console.log("wrong");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("wrong");
                    medical_ans = false;
                    $(".block").css("z-index", "9999999");
                }
                if (current_scene == "LETTER OF OFFER" && current_ans == 3) {
                    console.log("correct");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("correct");
                    letter_ans = true;
                    $(".block").css("z-index", "0");
                } else if (current_scene == "LETTER OF OFFER" && current_ans !== 3) {
                    console.log("wrong");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("wrong");
                    letter_ans = false;
                    $(".block").css("z-index", "9999999");
                }
                if (current_scene == "CONFIRMATION" && current_ans == 1) {
                    console.log("correct");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("correct");
                    confirmation_ans = true;
                    $(".block").css("z-index", "0");
                } else if (current_scene == "CONFIRMATION" && current_ans !== 1) {
                    console.log("wrong");
                    $("[data-answer]").removeClass("wrong");
                    $("[data-answer]").removeClass("correct");
                    $(this).addClass("wrong");
                    confirmation_ans = false;
                    $(".block").css("z-index", "9999999");
                }
            });
            //done
            $("[data-switch-room]").on("click", function() {
                var id = $(this).data("switch-room");
                $(".landing-div").removeClass("active");
                $(id).addClass("active");
            });
            $("[data-switch-knowmoreroom]").on("click", function() {
                var id = $(this).data("switch-knowmoreroom");
                $(id).find(".correct-frame").removeClass("active");
                $(id).find(".wrong-frame").removeClass("active");
                $(id).find(".explain-frame").addClass("active");
            });
            $("[data-explain-box]").on("click", function() {
                var id = $(this).data("explain-box");
                $(".explain-box").removeClass("active");
                $("#" + id).addClass("active");
            });
            $("[data-close-inner]").on("click", function() {
                $(".explain-box").removeClass("active");
            });
            $("[data-selected-answer]").on("click", function() {
                $("[data-selected-answer]").removeClass("active");
                $(this).addClass("active");
                submitOpen();
            });
            $("[data-close-answer-box]").on("click", function() {
                var targetIDBox = $(this).data("close-answer-box");
                $("#" + targetIDBox).removeClass("active");
                submitOpen();
            });
            $("[data-answer-submit]").on("click", function() {
                var targetID = $(this).data("answer-submit");
                var imageURL = $("#" + targetID).find("[data-selected-answer].active").data("img-url");
                targetAnswer[targetID] = $("#" + targetID).find("[data-selected-answer].active").data("answer");
                $("[data-answer-box='" + targetID + "']").find("img").attr("src", imageURL);
                // TEDY: i added this for easier to check answer when they selected
                $("[data-answer-box='" + targetID + "']").data("answerSelected", $("#" + targetID).find("[data-selected-answer].active").data("answer"));
                $(".answer-box").removeClass("active");
                submitOpen();
            });
            $("[data-answer-box]").on("click", function() {
                var targetID = $(this).data("answer-box");
                $("[data-selected-answer]").removeClass("active");
                if (targetAnswer[targetID] !== undefined) {
                    $("#" + targetID).find("[data-selected-answer='" + targetAnswer[targetID] + "']").addClass("active");
                }
                $(".answer-box").removeClass("active");
                $("#" + targetID).addClass("active");
            });
            $("[data-inner-room]").on("click", function() {
                var answer = $(this).data("inner-room");
                $(this).parent().parent().find(".answer-frame").removeClass("active");
                if (answer == "correct") {
                    $(this).parent().parent().find(".correct-frame").addClass("active");
                } else {
                    $(this).parent().parent().find(".wrong-frame").addClass("active");
                }
            });
        };
        ContentScreen = function() {};
        ContentEventFunction = function() {};
        $(document).ready(function() {
            EventFunction();
            ContentEventFunction();
            setInterval(function() {
                ContentMinHeight();
                QuestionScreen();
                MenuMinHeight();
                ContentResponsiveText();
                ContentScreen();
            }, 20);
        });
    };
    EVENT = function() {};
    window.sats.chapter.eight.two = {
        init: function() {
            UI();
            EVENT();
        }
    };
})($);

(function($) {
    var UI, EVENT;
    UI = function() {
        var ContentMinHeight, MenuMinHeight, QuestionScreen;
        ContentMinHeight = function() {
            var window_height = $(window).height();
        };
        ContentResponsiveText = function() {};
        MenuMinHeight = function() {
            var window_height = $(window).height();
            //$(".page-home .").css("min-height", window_height);
            $(".page-chapter .chapter-container .chapter-div:visible").css("maxHeight", $(window).height() - 50 - 20 + "px");
            // 50 = topbar height, 20 = padding height
            $(".page-chapter .chapter-container").css("top", parseInt(($(window).height() + 50 + 10 - $(".page-chapter .chapter-container").outerHeight()) / 2) + "px");
            $(".page-chapter .chapter-container").css("left", Math.max(0, ($(window).width() - $(".page-chapter .chapter-container .chapter-frame").outerWidth()) / 2) + "px");
            if ($(".page-chapter-8_4_1").length) {
                $(".page-chapter-8_4_1 .chapter-container:visible").css("top", parseInt(($(window).height() - $(".page-chapter-8_4_1 .chapter-container").outerHeight()) / 2) + "px");
            }
        };
        QuestionScreen = function() {
            // $(".vjs-tech, .video-frame, .vjs-poster, .video-js").css("height", ($(window).height() * 0.7) + "px");
            var videoHeight = $(window).height() * .7;
            var perHeight = videoHeight / 9;
            var videoWidth = perHeight * 16;
            while (videoWidth > $(".chapter-container").outerWidth()) {
                perHeight = perHeight - 1;
                videoWidth = perHeight * 16;
                videoHeight = perHeight * 9;
            }
            $(".page-chapter .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
            $(".page-chapter .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            $(".chapter-action").css("width", videoWidth + "px");
            if ($(".page-chapter-8_4_1").length) {
                var videoHeight = $(window).height() * .9;
                var perHeight = videoHeight / 9;
                var videoWidth = perHeight * 16;
                while (videoWidth > $(".chapter-container").outerWidth()) {
                    perHeight = perHeight - 1;
                    videoWidth = perHeight * 16;
                    videoHeight = perHeight * 9;
                }
                $(".page-chapter-8_4_1 .chapter-container .chapter-div:visible").css("height", videoHeight + "px");
                $(".page-chapter-8_4_1 .chapter-container .chapter-div:visible").css("width", videoWidth + "px");
            }
        };
        EventFunction = function() {
            $("[data-close-inner]").on("click", function() {
                var id = $(this).data("close-inner");
                $("[data-knowmore-room-id='" + id + "']").removeClass("active");
            });
            $("[data-knowmore-room]").on("click", function() {
                var id = $(this).data("knowmore-room");
                $("[data-knowmore-room-id='" + id + "']").addClass("active");
            });
            $("[data-continue-exit]").on("click", function() {
                var id = $(this).data("continue-exit");
                if (id == "end") {
                    $(".scene-one").removeClass("auto-flow");
                    $(".overlay-sucess").addClass("active");
                } else {
                    $("[data-knowmore-room-id='" + id + "']").removeClass("active");
                    $("[data-correct-id='" + id + "']").removeClass("active");
                }
            });
            $("[data-continue-wrong-frame]").on("click", function() {
                $(".wrong-frame").removeClass("active");
            });
            $(".answers-list").sortable({
                revert: true,
                connectWith: ".questions-list"
            });
            $(".questions-list").sortable({
                revert: true,
                connectWith: ".answers-list",
                receive: function(event, ui) {
                    var receiverID = ui.item.data("id");
                    var containerID = $(this).attr("id");
                    $("[data-correct-id]").removeClass("active");
                    if (receiverID !== containerID) {
                        $(ui.placeholder).addClass("ui-state-error");
                        $(ui.sender).sortable("cancel");
                        $("." + containerID).find(".wrong").addClass("active");
                        $("." + containerID).find(".correct").removeClass("active");
                        $("[data-id='" + receiverID + "']").addClass("wrong");
                        setTimeout(function() {
                            $("." + containerID).find(".correct").addClass("active");
                            $("." + containerID).find(".wrong").removeClass("active");
                            $("[data-id='" + receiverID + "']").removeClass("wrong");
                        }, 1e3);
                        $(".wrong-frame").addClass("active");
                    } else {
                        $("[data-correct-id='" + receiverID + "']").addClass("active");
                    }
                    // everytime received an item , we will check it's finish or no
                    if ($(".answers-list").children("li").length == 0) {
                        // alert('finish scene, please confirm with sl the design');
                        $("[data-continue-exit]").data("continue-exit", "end");
                        ContentMinHeight();
                    }
                }
            });
        };
        ContentScreen = function() {};
        ContentEventFunction = function() {};
        $(document).ready(function() {
            EventFunction();
            ContentEventFunction();
            setInterval(function() {
                ContentMinHeight();
                QuestionScreen();
                MenuMinHeight();
                ContentResponsiveText();
                ContentScreen();
            }, 20);
        });
    };
    EVENT = function() {};
    window.sats.chapter.eight.four = {
        init: function() {
            UI();
            EVENT();
        }
    };
})($);