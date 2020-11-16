const getMenuFrontend = ( userRole = 'USER_ROLE' ) => {
    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url: '/'},
            { title: 'Progress Bar', url: 'progress'},
            { title: 'Graphics', url: 'grafica1'},
            { title: 'Promises', url: 'promises'},
            { title: 'Observables', url: 'observables'},
          ]
        },
        {
          title: 'Maintenance',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // { title: 'Users', url: 'users'},
            { title: 'Hospitals', url: 'hospitals'},
            { title: 'Doctors', url: 'doctors'},
          ]
        }
      ];

      if(userRole === 'ADMIN_ROLE') {
          menu[1].submenu.unshift({ title: 'Users', url: 'users'});
      }

      return menu;
};

module.exports = {
    getMenuFrontend
}