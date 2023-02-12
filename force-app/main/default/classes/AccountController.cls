public class AccountController {
     public static Account insertAccount(Account accountToInsert) {
        insert accountToInsert;
        return accountToInsert;
    }
    
    public static List<Account> insertAccounts(List<Account> accountsToInsert) {
        insert accountsToInsert;
        return accountsToInsert;
    }
    
    public static List<Account> getAllAccounts() {
        // Retreive all accounts and assign to a List collection
        List<Account> accounts = [SELECT Name, Phone FROM Account];
        
        return accounts;
    }
    
    public static void printAllAccounts() {
        List<Account> accounts = getAllAccounts();
        
        // iterate over all accounts and print account information
        for(Account acc: accounts) {
            System.debug('Account Name: ' + acc.Name + ' Account Phone: ' + acc.Phone);
        }
    }
    
    public static Integer getAccountSize() {
        List<Account> accounts = getAllAccounts();
        return accounts.size();
    }
}