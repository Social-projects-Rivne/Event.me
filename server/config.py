import ConfigParser
import subprocess


config = ConfigParser.RawConfigParser()
config.read('config.cfg')

"""
    Migration
"""

alembic = config.get('alembic', 'migration')

run = subprocess.Popen(alembic.split(), stdout=subprocess.PIPE)

print run.communicate()

"""
    Seeding
"""

# seed_roles #

seed_roles = config.get('seeding', 'seed_role')
run = subprocess.Popen(seed_roles.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_tags = config.get('seeding', 'seed_tag')
run = subprocess.Popen(seed_tags.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_categories = config.get('seeding', 'seed_category')
run = subprocess.Popen(seed_categories.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_user_statuses = config.get('seeding', 'seed_user_status')
run = subprocess.Popen(seed_user_statuses.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_event_statuses = config.get('seeding', 'seed_event_status')
run = subprocess.Popen(seed_event_statuses.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_users = config.get('seeding', 'seed_user')
run = subprocess.Popen(seed_users.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_events = config.get('seeding', 'seed_event')
run = subprocess.Popen(seed_events.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_event_tags = config.get('seeding', 'seed_event_tag')
run = subprocess.Popen(seed_event_tags.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_event_history = config.get('seeding', 'seed_event_history')
run = subprocess.Popen(seed_event_history.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_gallery = config.get('seeding', 'seed_gallery')
run = subprocess.Popen(seed_gallery.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_feedback = config.get('seeding', 'seed_feedback')
run = subprocess.Popen(seed_feedback.split(), stdout=subprocess.PIPE)
print run.communicate()

seed_subscribes = config.get('seeding', 'seed_subscribe')
run = subprocess.Popen(seed_subscribes.split(), stdout=subprocess.PIPE)
print run.communicate()
