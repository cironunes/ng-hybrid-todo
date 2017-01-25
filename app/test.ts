import './vendor';
import 'angular-mocks/ngMock';
// import './index';

var req = (<any>require).context('./', true, /spec\.ts$/);
req.keys().forEach(req);
