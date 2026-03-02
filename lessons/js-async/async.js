/**
 * ==========================================
 * Example Scenario:
 * We want to simulate:
 * 1. Getting a user
 * 2. Getting user posts
 * 3. Getting comments for the first post
 *
 * Each step depends on the previous one.
 * We simulate async behavior using setTimeout.
 * ==========================================
 */

/**
 * ==========================================
 * 1️⃣ NESTED CALLBACKS (Callback Hell)
 * ==========================================
 */

function getUserCallback(id, callback) {
    // Simulate async operation
    setTimeout(() => {
        console.log("User fetched");
        callback({ id: id, name: "John" });
    }, 1000);
}

function getPostsCallback(userId, callback) {
    setTimeout(() => {
        console.log("Posts fetched");
        callback([{ id: 1, title: "Post 1" }]);
    }, 1000);
}

function getCommentsCallback(postId, callback) {
    setTimeout(() => {
        console.log("Comments fetched");
        callback(["Great post!", "Nice article"]);
    }, 1000);
}

// Nested structure begins
getUserCallback(1, (user) => {

    // We are now inside the callback of first async operation
    getPostsCallback(user.id, (posts) => {

        // Nested again → harder to read
        getCommentsCallback(posts[0].id, (comments) => {

            console.log("Final Result (Callbacks):", comments);

        });

    });

});

/**
 * Problems:
 * - Deep nesting
 * - Hard to read
 * - Hard error handling
 * - Called "Callback Hell"
 */


/**
 * ==========================================
 * 2️⃣ PROMISES (.then / .catch / .finally)
 * ==========================================
 */

function getUserPromise(id) {
    return new Promise((resolve, reject) => {

        // Async operation handled by Web APIs
        setTimeout(() => {
            console.log("User fetched (Promise)");
            resolve({ id: id, name: "John" });
        }, 1000);

    });
}

function getPostsPromise(userId) {
    return new Promise((resolve) => {

        setTimeout(() => {
            console.log('user ID', userId)
            console.log("Posts fetched (Promise)");
            resolve([{ id: 1, title: "Post 1" }]);
        }, 1000);

    });
}

function getCommentsPromise(postId) {
    return new Promise((resolve) => {

        setTimeout(() => {
            console.log('post ID', postId)
            console.log("Comments fetched (Promise)");
            resolve(["Great post!", "Nice article"]);
        }, 1000);

    });
}

// Promise chaining
getUserPromise(1)
    .then((user) => {

        // Returning a promise passes result to next .then
        return getPostsPromise(user.id);

    })
    .then((posts) => {

        return getCommentsPromise(posts[0].id);

    })
    .then((comments) => {

        console.log("Final Result (Promises):", comments);

    })
    .catch((error) => {

        // Handles any error from chain
        console.error("Error:", error);

    })
    .finally(() => {

        // Always runs
        console.log("Promise flow finished");

    });

/**
 * What happens internally:
 * 1. Promise created → pending state
 * 2. setTimeout runs in Web APIs
 * 3. resolve() moves promise to fulfilled state
 * 4. .then callback goes to Microtask Queue
 * 5. Event loop pushes it to Call Stack
 */

/**
 * ==========================================
 * 3️⃣ ASYNC / AWAIT (Built on Promises)
 * ==========================================
 */

async function runAsyncFlow() {

    try {

        /**
         * await pauses this async function
         * but DOES NOT block JavaScript thread
         */

        const user = await getUserPromise(1);

        const posts = await getPostsPromise(user.id);

        const comments = await getCommentsPromise(posts[0].id);

        console.log("Final Result (Async/Await):", comments);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        console.log("Async/Await flow finished");
    }
}

// Start async/await flow
runAsyncFlow();


/**
 * Internal behavior of async/await:
 *
 * async function always returns a Promise
 *
 * await does:
 * 1. Wait for promise to resolve
 * 2. Resume function in Microtask Queue
 * 3. Continue execution
 *
 * It is syntactic sugar over .then()
 */