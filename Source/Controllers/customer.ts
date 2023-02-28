import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
const NAMESPACE = 'Customers';

/**Connect to database and retrieve all customers */
const getAllCustomers = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all customers');

    let query = 'SELECT * FROM customers'; //actual query

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    return res.status(200).json({
                        //throw results as json
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                }); //Close connection
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

/**Connect to database and retrieve the spending records of all customers
 * data comes from customers and payments joined on customer number with all payments summed
 */
const getCustomersSpendingRecord = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Getting all customers' spending records");

    let query =
        'SELECT DISTINCT customers.customerName, SUM(payments.amount) FROM customers INNER JOIN payments ON customers.customerNumber = payments.customerNumber GROUP BY customers.customerNumber'; //actual query

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    return res.status(200).json({
                        //throw results as json
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                }); //Close connection
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

/**Connect to database and retrieve the addresses of employee's jobsites from the offices table
 *
 */
const getEmployeesJobSites = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all employees along with jobsites');

    let query =
        'SELECT DISTINCT employees.employeeNumber, employees.firstName, employees.lastName, offices.addressLine1 FROM employees INNER JOIN offices ON employees.officeCode = offices.officeCode GROUP BY employee.employeeNumber'; //actual query

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    return res.status(200).json({
                        //throw results as json
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                }); //Close connection
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { getAllCustomers, getCustomersSpendingRecord, getEmployeesJobSites };
