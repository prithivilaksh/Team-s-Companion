const staticCacheName = 'site-static-v11';
const dynamicCacheName = 'site-dynamic-v11';
const assets = ['/', '/manifest.json',
  '/asserts/images/icons/add.png',
  '/asserts/images/icons/ask.png',
  '/asserts/images/icons/postAns.png',
  '/asserts/images/icons/askQues.png',
  '/asserts/images/icons/button/assignment.png',
  '/asserts/images/icons/button/create_room.png',
  '/asserts/images/icons/button/event.png',
  '/asserts/images/icons/button/join_room.png',
  '/asserts/images/icons/button/google.webp',
  '/asserts/images/icons/carousel/next_img.png',
  '/asserts/images/icons/carousel/prev_img.png',
  '/asserts/images/icons/menu/back.png',
  '/asserts/images/icons/carousel/menu.png',
  '/asserts/images/icons/carousel/slash.png',
]
  /*'index.html',
  '/signin',
  '../src/components/auth/SignIn.js',
  '../src/components/auth/SignUp.js',
  '../src/components/dashboard/Dashboard.js',
  '../src/components/layout/Navbar.js',
  '../src/components/layout/SignedInLinks.js',
  '../src/components/layout/SignedOutLinks.js',
  '../src/components/projects/CreateProject.js',
  '../src/components/projects/ProjectDetails.js',
  '../src/components/projects/ProjectList.js',
  '../src/components/projects/ProjectSummary.js',
  '../src/store/actions/authActions.js',
  '../src/store/actions/projectActions.js',
  '../src/store/reducers/authReducer.js',
  '../src/store/reducers/projectReducer.js',
  '../src/store/reducers/rootReducer.js',
  '../src/App.js',
  '../src/index.js',
  '../src/index.css',
 
  'manifest.json'
];*/

self.addEventListener('install', evt => {
    console.log('service worker installed');
   evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
  });
  


  const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
      cache.keys().then(keys => {
        if(keys.length > size){
          cache.delete(keys[0]).then(limitCacheSize(name, size));
        }
      });
    });
  };

  self.addEventListener('activate', evt => {
    console.log('service worker activated');
    evt.waitUntil(
      caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
        );
      })
    );
  });

  self.addEventListener('fetch', evt => {
      evt.respondWith(caches.match(evt.request).then(()=>{
        return fetch(evt.request)
        .catch(()=> caches.match("fallback.html"))
      })
      )
    });