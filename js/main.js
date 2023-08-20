/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

$(document).ready(function () {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function () {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.show();
      nav.show();
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function () {
      if (menu.is(":hidden")) {
        menu.show();
        menuIcon.addClass("active");
      } else {
        menu.hide();
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function () {
        /* var topDistance = menu.offset().top; */
        var topDistance = $(window).scrollTop();

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 100) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if (!$("#menu-icon").is(":visible") && topDistance < 50) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (!$("#menu-icon").is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($("#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function () {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop) {
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
});



// 文章内容复制限制
document.querySelector('.content.e-content').addEventListener('copy', function (e) {
  var selectedText = window.getSelection().toString(); // 获取选中的文本
  var additionalText = '\n\n转载自拾三のBlog\n原文链接: <%= page.permalink %>'; // 指定的附加内容

  if (selectedText) {
    e.preventDefault(); // 阻止默认的复制行为
    var copiedText = selectedText + additionalText; // 拼接复制的文本
    e.clipboardData.setData('text/plain', copiedText); // 将拼接后的文本设置到剪贴板中
    // 显示提示
    var copySuccess = document.getElementById('copy-success');
    copySuccess.style.display = 'block';

    // 3秒后隐藏提示
    setTimeout(function () {
      copySuccess.style.display = 'none';
    }, 3000);
  }
});


