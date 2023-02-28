import express from 'express';
import controller from '../Controllers/customer'
const router = express.Router();

router.get('/get/Customers', controller.getAllCustomers);
router.get('/get/CustomersSpendingRecord', controller.getCustomersSpendingRecord);
router.get('/get/EmployeesJobSites', controller.getEmployeesJobSites);


export = router;