class SchemaRouter:
    # Define the apps that use the default database
    APP_LABELS = {'community', 'login', 'detect'}

    def db_for_read(self, model, **hints):
        """
        Routes all read operations for specific apps to the default database.
        """
        if model._meta.app_label in self.APP_LABELS:
            return 'default'
        return None

    def db_for_write(self, model, **hints):
        """
        Routes all write operations for specific apps to the default database.
        """
        if model._meta.app_label in self.APP_LABELS:
            return 'default'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allows relations if both objects are in the specified apps.
        """
        if obj1._meta.app_label in self.APP_LABELS and obj2._meta.app_label in self.APP_LABELS:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Ensures that migrations only occur on the default database for specified apps.
        """
        if app_label in self.APP_LABELS:
            return db == 'default'
        return None
