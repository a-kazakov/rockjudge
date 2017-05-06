class CachedClass:
    def __getattr__(self, key):
        if key[0] == "_":
            raise RuntimeError("{} is not defined".format(key[1:]))
        value = getattr(self, "_" + key)()
        setattr(self, key, value)
        return value
