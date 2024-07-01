class LoginAppRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'login':
            return 'login_db'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'login':
            return 'login_db'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'login' or obj2._meta.app_label == 'login':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'login':
            return db == 'login_db'
        return None

class CommunityAppRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'community':
            return 'community_db'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'community':
            return 'community_db'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'community' or obj2._meta.app_label == 'community':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'community':
            return db == 'community_db'
        return None
