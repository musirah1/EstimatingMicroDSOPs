from estimark.calibration.options import low_resource, medium_resource
from estimark.estimation import estimate


def test_low_resource():
    print("Running low-resource replication...")
    estimate(**low_resource)


def test_medium_resource():
    print("Running medium-resource replication...")
    estimate(**medium_resource)


def test_portfolio_low_resource():
    print("Running medium-resource replication...")
    estimate(**low_resource, agent_name="Portfolio")


def test_warmglow_low_resource():
    print("Running medium-resource replication...")
    estimate(**low_resource, agent_name="WarmGlow")


def test_warmglowportfolio_low_resource():
    print("Running medium-resource replication...")
    estimate(**low_resource, agent_name="WarmGlowPortfolio")


def test_wealthportfolio_low_resource():
    print("Running medium-resource replication...")
    estimate(**low_resource, agent_name="WealthPortfolio")
