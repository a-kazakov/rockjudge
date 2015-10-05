import cProfile
import pstats
import tempfile
import time

from contextlib import contextmanager


def profile(sort='cumulative', lines=50, strip_dirs=False):
    def outer(fun):
        def inner(*args, **kwargs):
            file = tempfile.NamedTemporaryFile(mode="w", delete=False)
            prof = cProfile.Profile()
            try:
                ret = prof.runcall(fun, *args, **kwargs)
            except:
                file.close()
                raise

            prof.dump_stats(file.name)
            stats = pstats.Stats(file.name)
            if strip_dirs:
                stats.strip_dirs()
            if isinstance(sort, (tuple, list)):
                stats.sort_stats(*sort)
            else:
                stats.sort_stats(sort)
            stats.print_stats(lines)

            file.close()
            return ret
        return inner

    # in case this is defined as "@profile" instead of "@profile()"
    if hasattr(sort, '__call__'):
        fun = sort
        sort = 'cumulative'
        outer = outer(fun)
    return outer


@contextmanager
def timer(name):
    s = time.time()
    yield
    print("Execution time of {}: {:.3f}s".format(name, time.time() - s))
