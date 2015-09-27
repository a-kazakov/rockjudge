from .score import TourScores


def get_tour_table(tour):
    return TourScores(tour).get_tour_table()
