/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has defined non-empty URLs',function(){
            for(var i=0;i<allFeeds.length;i++){
                var temp=allFeeds[i];
                expect(temp.url).toBeDefined();
                expect(temp.url).not.toBe('');
            }
        });
        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has defined non-empty Names',function(){
            for(var i=0;i<allFeeds.length;i++){
                var temp=allFeeds[i];
                expect(temp.name).toBeDefined();
                expect(temp.name).not.toBe('');
            }
        });
    });
    /* A test suite named "The menu" */
    describe('The Menu',function(){
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default',function(){
            /* First we get the class of the body element
             * then we check whether it has class .menu-hidden
             * this is the class which keeps the menu hidden
             */
            var bodyCSS=$('body').attr('class');
            expect(bodyCSS).toBe('menu-hidden');
        });
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('toggles display when clicked',function(){
            /* First we get the menu anchor element
             */
            var menu=$('.menu-icon-link');
            /* on each trigger of the click event
             * we check whether the class in the body
             */
            menu.trigger('click');
            var bodyCSS=$('body').attr('class');
            /* the .menu-hidden class is removed
             * from the body element thus displaying
             * the menu
             */
            expect(bodyCSS).not.toBe('menu-hidden');
            /* On the next click
             * the menu is displayed
             */
            menu.trigger('click');
            bodyCSS=$('body').attr('class');
            expect(bodyCSS).toBe('menu-hidden');
        });
    });
    /* A test suite named "Initial Entries" */
    describe('Initial Entries',function(){
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */  
        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });

            jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
        });
        it('has atleast one entry',function(done){
            var feed=$('.feed');
            var entry=feed.find('.entry');
            expect(entry.length).toBeGreaterThan(0);
            done();
        })
    });
    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection',function(){
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed_0;
        beforeEach(function(done){
            loadFeed(0,function(){
                feed_0==$('.feed').html();
                loadFeed(1,function(){done()});
            });
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
        });
        it('changes the content of feed',function(done){
            var feed_1=$('.feed').html();
            /* First check that the initial feed is not empty
            */
            expect(feed_0).not.toBe('');
            /* Then we check that the feed content 
             * is changed by the next load feed call 
             */
            expect(feed_0).not.toEqual(feed_1);
            done();          
        });
    });
}());
