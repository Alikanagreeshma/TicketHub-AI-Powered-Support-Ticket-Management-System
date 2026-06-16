from flask import Blueprint, request, jsonify
from models import db, Ticket, User, Comment
from datetime import datetime

tickets_bp = Blueprint("tickets", __name__)


# POST - Create a new ticket
@tickets_bp.route("/tickets", methods=["POST"])
def create_ticket():
    try:
        data = request.json

        # Validate required fields
        if not data.get("user_id") or not data.get("subject") or not data.get("description"):
            return jsonify({
                "message": "Missing required fields: user_id, subject, description"
            }), 400

        # Check if user exists
        user = User.query.get(data["user_id"])
        if not user:
            return jsonify({
                "message": "User not found"
            }), 404

        # Create new ticket
        ticket = Ticket(
            user_id=data["user_id"],
            subject=data["subject"],
            description=data["description"],
            category=data.get("category", "General"),
            priority=data.get("priority", "Medium"),
            status="Open",
            assigned_admin=None
        )

        db.session.add(ticket)
        db.session.commit()

        return jsonify({
            "message": "Ticket created successfully",
            "ticket_id": ticket.ticket_id,
            "user_id": ticket.user_id,
            "subject": ticket.subject,
            "description": ticket.description,
            "category": ticket.category,
            "priority": ticket.priority,
            "status": ticket.status,
            "created_at": ticket.created_at.isoformat()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": f"Error creating ticket: {str(e)}"
        }), 500


# GET - Return all tickets
@tickets_bp.route("/tickets", methods=["GET"])
def get_all_tickets():
    try:
        # Get query parameters for filtering
        status = request.args.get("status")
        priority = request.args.get("priority")
        user_id = request.args.get("user_id")

        query = Ticket.query

        # Apply filters if provided
        if status:
            query = query.filter_by(status=status)
        if priority:
            query = query.filter_by(priority=priority)
        if user_id:
            query = query.filter_by(user_id=user_id)

        tickets = query.all()

        tickets_list = []
        for ticket in tickets:
            tickets_list.append({
                "ticket_id": ticket.ticket_id,
                "user_id": ticket.user_id,
                "subject": ticket.subject,
                "description": ticket.description,
                "category": ticket.category,
                "priority": ticket.priority,
                "status": ticket.status,
                "assigned_admin": ticket.assigned_admin,
                "created_at": ticket.created_at.isoformat(),
                "updated_at": ticket.updated_at.isoformat()
            })

        return jsonify({
            "message": "Tickets retrieved successfully",
            "count": len(tickets_list),
            "tickets": tickets_list
        }), 200

    except Exception as e:
        return jsonify({
            "message": f"Error retrieving tickets: {str(e)}"
        }), 500


# GET - Return one ticket by ID
@tickets_bp.route("/tickets/<int:ticket_id>", methods=["GET"])
def get_ticket(ticket_id):
    try:
        ticket = Ticket.query.get(ticket_id)

        if not ticket:
            return jsonify({
                "message": "Ticket not found"
            }), 404

        # Get comments for this ticket
        comments = Comment.query.filter_by(ticket_id=ticket_id).all()
        comments_list = []
        for comment in comments:
            comments_list.append({
                "id": comment.id,
                "ticket_id": comment.ticket_id,
                "sender_id": comment.sender_id,
                "message": comment.message,
                "timestamp": comment.timestamp.isoformat()
            })

        return jsonify({
            "message": "Ticket retrieved successfully",
            "ticket": {
                "ticket_id": ticket.ticket_id,
                "user_id": ticket.user_id,
                "subject": ticket.subject,
                "description": ticket.description,
                "category": ticket.category,
                "priority": ticket.priority,
                "status": ticket.status,
                "assigned_admin": ticket.assigned_admin,
                "created_at": ticket.created_at.isoformat(),
                "updated_at": ticket.updated_at.isoformat(),
                "comments": comments_list
            }
        }), 200

    except Exception as e:
        return jsonify({
            "message": f"Error retrieving ticket: {str(e)}"
        }), 500


# PUT - Update ticket status, assigned admin, and resolution details
@tickets_bp.route("/tickets/<int:ticket_id>", methods=["PUT"])
def update_ticket(ticket_id):
    try:
        ticket = Ticket.query.get(ticket_id)

        if not ticket:
            return jsonify({
                "message": "Ticket not found"
            }), 404

        data = request.json

        # Update status if provided
        if "status" in data:
            valid_statuses = ["Open", "In Progress", "On Hold", "Resolved", "Closed"]
            if data["status"] not in valid_statuses:
                return jsonify({
                    "message": f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
                }), 400
            ticket.status = data["status"]

        # Update priority if provided
        if "priority" in data:
            valid_priorities = ["Low", "Medium", "High"]
            if data["priority"] not in valid_priorities:
                return jsonify({
                    "message": f"Invalid priority. Must be one of: {', '.join(valid_priorities)}"
                }), 400
            ticket.priority = data["priority"]

        # Update assigned admin if provided
        if "assigned_admin" in data:
            if data["assigned_admin"] is not None:
                admin = User.query.get(data["assigned_admin"])
                if not admin:
                    return jsonify({
                        "message": "Admin user not found"
                    }), 404
                if admin.role != "admin":
                    return jsonify({
                        "message": "User is not an admin"
                    }), 400
            ticket.assigned_admin = data["assigned_admin"]

        # Update category if provided
        if "category" in data:
            ticket.category = data["category"]

        # Update description if provided
        if "description" in data:
            ticket.description = data["description"]

        # Update timestamp
        ticket.updated_at = datetime.utcnow()

        db.session.commit()

        return jsonify({
            "message": "Ticket updated successfully",
            "ticket": {
                "ticket_id": ticket.ticket_id,
                "user_id": ticket.user_id,
                "subject": ticket.subject,
                "description": ticket.description,
                "category": ticket.category,
                "priority": ticket.priority,
                "status": ticket.status,
                "assigned_admin": ticket.assigned_admin,
                "created_at": ticket.created_at.isoformat(),
                "updated_at": ticket.updated_at.isoformat()
            }
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": f"Error updating ticket: {str(e)}"
        }), 500
