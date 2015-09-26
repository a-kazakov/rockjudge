from .score import TourScores


def get_advanced_to_next_tour(tour):
    return TourScores(tour).get_advanced_to_next_tour()
