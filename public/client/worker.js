console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved... with event details", e.data.json());
  self.registration.showNotification(data.title, {
    body: "Notified by Apostolis Gerodimos",
    icon: "../room8s_logo.png"
  });
});
