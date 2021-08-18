public with sharing class ObjectRetrieveController {
    @auraenabled(cacheable=true)
    public List<SelectOption> getobjNames() {
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('--None', '--None--'));
        for (Schema.SObjectType f : gd) {
            if (!f.getDescribe().getName().contains('__'))
                options.add(new SelectOption(f.getDescribe().getName(), f.getDescribe().getName()));
        }
        return options;
    }
}
