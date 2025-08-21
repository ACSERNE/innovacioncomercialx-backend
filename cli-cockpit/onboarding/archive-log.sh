#!/bin/bash
name="$1"
role="$2"
mkdir -p logs
echo "$(date) - Registro de $name como $role" >> logs/actions.log
