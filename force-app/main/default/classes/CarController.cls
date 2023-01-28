public with sharing class CarController {
    @AuraEnabled
    public static List<Car__c> getAllCars(Integer lmt, Integer offset, String searchTerm){

        String query = 'SELECT Id, Name, Make__c, Picture_URL__c FROM Car__c';

        if (searchTerm != '') {
            query += ' where Name like' +  '\'%' + searchTerm + '%\'';
        }

        query += ' limit: lmt offset: offset';

        // List<Car__c> cars = [SELECT Id, Name, Make__c, Picture_URL__c FROM Car__c limit: lmt offset: offset];

        List<Car__c> cars = Database.query(query);

        return cars;
    }

}