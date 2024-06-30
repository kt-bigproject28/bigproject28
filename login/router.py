# router.py

class LoginAppRouter:
    """
    A router to control all database operations on models in the
    login application.
    """
    def db_for_read(self, model, **hints):
        """
        Attempts to read login models go to login_db.
        """
        if model._meta.app_label == 'login':
            return 'login_db'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write login models go to login_db.
        """
        if model._meta.app_label == 'login':
            return 'login_db'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the login app is involved.
        """
        if obj1._meta.app_label == 'login' or \
           obj2._meta.app_label == 'login':
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the login app only appears in the 'login_db'
        database.
        """
        if app_label == 'login':
            return db == 'login_db'
        return None
