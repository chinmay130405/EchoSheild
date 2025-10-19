# 🎯 EchoSheild - Contributing Guide

## How to Contribute

We welcome contributions from everyone! Here are ways you can help:

### Bug Reports
1. Check existing issues
2. Create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/logs if applicable

### Feature Requests
1. Check existing issues
2. Describe the feature clearly
3. Explain the use case
4. Suggest implementation approach

### Code Contributions

#### Setup Development Environment
```bash
# Clone repo
git clone https://github.com/yourfork/echosheild.git
cd echosheild

# Create feature branch
git checkout -b feature/your-feature

# Setup each component
cd frontend && npm install
cd ../backend && pip install -r requirements.txt
cd ../agent && pip install -r requirements.txt
```

#### Making Changes
1. Make focused, atomic commits
2. Follow code style (ESLint for JS, Black for Python)
3. Add tests for new features
4. Update documentation
5. Test all three components work together

#### Submitting PR
1. Push to your fork
2. Create Pull Request with:
   - Clear description
   - Link to related issue
   - List of changes
   - Testing performed
   - Screenshots (for UI changes)

### Code Style

**JavaScript/React**
```javascript
// Use functional components
const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// Use descriptive names
const getTrustScoreColor = (score) => { ... };
```

**Python**
```python
# Use type hints
def verify_claim(claim: str, sources: List[str]) -> Dict:
    """Docstring explaining function"""
    pass

# Follow PEP 8
class MisinformationAgent:
    def __init__(self, backend_url: str):
        self.backend_url = backend_url
```

### Documentation
- Update README.md for major features
- Add docstrings to functions
- Comment complex logic
- Update API documentation

---

## Support the Project

⭐ Star the repository
📢 Share with others
💬 Provide feedback
🐛 Report bugs

---

Thank you for contributing! 🚀
